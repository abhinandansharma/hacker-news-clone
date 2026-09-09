import { fetchStories } from './api';
import type { StoryType } from '@/types/hackernews';
import type { Snapshot } from '@/hooks/useStories';

/**
 * Build-time fetch of page 1 of a feed. Never fails the build: an unreachable API just means an empty first paint,
 * logged so it is not silent. Next caches these fetches in .next/cache/fetch-cache across builds, which would bake a
 * stale list into the HTML, so the build script clears that directory first (a `no-store` fetch is not an option:
 * it marks the page dynamic, which a static export rejects).
 */
export async function buildSnapshot(type: StoryType): Promise<Snapshot> {
  try {
    const r = await fetchStories(type, 1, 30);
    return { stories: r.stories, totalPages: r.totalPages };
  } catch (e) {
    console.warn(`[snapshot] ${type}: ${e instanceof Error ? e.message : e}`);
    return { stories: [], totalPages: 1 };
  }
}
