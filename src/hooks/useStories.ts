'use client';

import { useEffect, useState } from 'react';
import { fetchStories } from '@/lib/api';
import type { Story, StoryType } from '@/types/hackernews';

export const PAGE_SIZE = 30;

/** Loads one page of a feed in the browser. Ignores results from a superseded request. */
export function useStories(type: StoryType, page: number) {
  const [stories, setStories] = useState<Story[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchStories(type, page, PAGE_SIZE)
      .then((r) => { if (!cancelled) { setStories(r.stories); setTotalPages(r.totalPages); setLoading(false); } })
      .catch((e: unknown) => { if (!cancelled) { setError(e instanceof Error ? e.message : 'Failed to load'); setLoading(false); } });
    return () => { cancelled = true; };
  }, [type, page]);

  return { stories, totalPages, loading, error };
}
