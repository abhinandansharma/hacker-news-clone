import { fetchStories } from './api';
import type { StoryType } from '@/types/hackernews';
import type { Snapshot } from '@/hooks/useStories';

/** Build-time fetch of page 1 of a feed. Never fails the build: an unreachable API just means an empty first paint. */
export async function buildSnapshot(type: StoryType): Promise<Snapshot> {
  try {
    const r = await fetchStories(type, 1, 30);
    return { stories: r.stories, totalPages: r.totalPages };
  } catch {
    return { stories: [], totalPages: 1 };
  }
}
