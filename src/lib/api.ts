import { FEEDS, Story, StoryType } from '@/types/hackernews';

const API_BASE = 'https://hacker-news.firebaseio.com/v0';
const CACHE_MS = 5 * 60 * 1000;

const idsCache = new Map<StoryType, { ids: number[]; at: number }>();
const itemCache = new Map<number, { item: Story; at: number }>();

export async function fetchItem(id: number): Promise<Story | null> {
  const hit = itemCache.get(id);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.item;
  const res = await fetch(`${API_BASE}/item/${id}.json`);
  if (!res.ok) throw new Error(`HN API ${res.status}`);
  const item = (await res.json()) as Story | null;
  if (item) itemCache.set(id, { item, at: Date.now() });
  return item;
}

export async function fetchStoryIds(type: StoryType): Promise<number[]> {
  const hit = idsCache.get(type);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.ids;
  const endpoint = FEEDS.find((f) => f.type === type)!.endpoint;
  const res = await fetch(`${API_BASE}/${endpoint}.json`);
  if (!res.ok) throw new Error(`HN API ${res.status}`);
  const ids = (await res.json()) as number[];
  idsCache.set(type, { ids, at: Date.now() });
  return ids;
}

/** One page of a feed, fetched in small parallel batches. Also returns the page count for the feed. */
export async function fetchStories(type: StoryType, page: number, limit = 30): Promise<{ stories: Story[]; totalPages: number }> {
  const ids = await fetchStoryIds(type);
  const totalPages = Math.max(1, Math.ceil(ids.length / limit));
  const pageIds = ids.slice((page - 1) * limit, page * limit);
  const stories: Story[] = [];
  for (let i = 0; i < pageIds.length; i += 10) {
    const batch = await Promise.all(pageIds.slice(i, i + 10).map((id) => fetchItem(id).catch(() => null)));
    stories.push(...batch.filter((s): s is Story => !!s && (s.type === 'story' || s.type === 'job')));
  }
  return { stories, totalPages };
}
