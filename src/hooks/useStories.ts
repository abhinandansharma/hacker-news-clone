'use client';

import { useEffect, useState } from 'react';
import { fetchStories } from '@/lib/api';
import type { Story, StoryType } from '@/types/hackernews';

export const PAGE_SIZE = 30;

export interface Snapshot { stories: Story[]; totalPages: number }

/**
 * Loads one page of a feed in the browser. Ignores results from a superseded request.
 * A build-time `snapshot` seeds page 1 so the static HTML already carries stories; the live fetch then replaces it.
 */
export function useStories(type: StoryType, page: number, snapshot?: Snapshot) {
  const seeded = page === 1 && !!snapshot && snapshot.stories.length > 0;
  const [stories, setStories] = useState<Story[]>(seeded ? snapshot!.stories : []);
  const [totalPages, setTotalPages] = useState(seeded ? snapshot!.totalPages : 1);
  const [loading, setLoading] = useState(!seeded);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!(page === 1 && snapshot && snapshot.stories.length > 0)) setLoading(true);
    setError(null);
    fetchStories(type, page, PAGE_SIZE)
      .then((r) => { if (!cancelled) { setStories(r.stories); setTotalPages(r.totalPages); setLoading(false); } })
      .catch((e: unknown) => { if (!cancelled) { setError(e instanceof Error ? e.message : 'Failed to load'); setLoading(false); } });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, page]);

  return { stories, totalPages, loading, error };
}
