'use client';

import { useCallback, useEffect, useState } from 'react';
import { fetchStories } from '@/lib/api';
import type { Story, StoryType } from '@/types/hackernews';

export const PAGE_SIZE = 30;

export interface Snapshot { stories: Story[]; totalPages: number }

const sameOrder = (a: Story[], b: Story[]) => a.length === b.length && a.every((s, i) => s.id === b[i].id);

/**
 * Loads one page of a feed in the browser. Ignores results from a superseded request.
 *
 * A build-time `snapshot` seeds page 1 so the static HTML already carries stories. When the live fetch lands, scores
 * and comment counts are refreshed in place, but the order on screen is kept: swapping in a re-ranked list under the
 * reader's eyes made the page jump. The new order waits in `pending` until `applyPending` is called.
 */
export function useStories(type: StoryType, page: number, snapshot?: Snapshot) {
  const seeded = page === 1 && !!snapshot && snapshot.stories.length > 0;
  const [stories, setStories] = useState<Story[]>(seeded ? snapshot!.stories : []);
  const [totalPages, setTotalPages] = useState(seeded ? snapshot!.totalPages : 1);
  const [pending, setPending] = useState<Story[] | null>(null);
  const [loading, setLoading] = useState(!seeded);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!seeded) setLoading(true);
    setError(null);
    setPending(null);
    fetchStories(type, page, PAGE_SIZE)
      .then((r) => {
        if (cancelled) return;
        setTotalPages(r.totalPages);
        setLoading(false);
        if (!seeded || sameOrder(snapshot!.stories, r.stories)) { setStories(r.stories); return; }
        const live = new Map(r.stories.map((s) => [s.id, s]));
        setStories((cur) => cur.map((s) => live.get(s.id) ?? s));
        setPending(r.stories);
      })
      .catch((e: unknown) => { if (!cancelled) { setError(e instanceof Error ? e.message : 'Failed to load'); setLoading(false); } });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, page]);

  const applyPending = useCallback(() => {
    setPending((p) => { if (p) setStories(p); return null; });
  }, []);

  return { stories, totalPages, loading, error, pending, applyPending };
}
