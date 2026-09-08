'use client';

import { useEffect, useState } from 'react';
import { fetchStories } from '@/lib/api';
import type { Story, StoryType } from '@/types/hackernews';

const ITEMS_PER_PAGE = 30;
const TOTAL_ITEMS = 500; // the HN API exposes at most 500 ids per list

export const TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

/** Loads one page of a story list in the browser. Cancels if the page or type changes mid-flight. */
export function useStories(type: StoryType, page: number) {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchStories(type, page, ITEMS_PER_PAGE)
      .then((s) => { if (!cancelled) { setStories(s); setLoading(false); } })
      .catch((e: unknown) => { if (!cancelled) { setError(e instanceof Error ? e.message : 'Failed to load stories'); setLoading(false); } });
    return () => { cancelled = true; };
  }, [type, page]);

  return { stories, loading, error, totalPages: TOTAL_PAGES };
}
