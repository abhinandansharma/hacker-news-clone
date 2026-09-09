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

/** One page of a feed, its items fetched in parallel. Also returns the page count for the feed. */
export async function fetchStories(type: StoryType, page: number, limit = 30): Promise<{ stories: Story[]; totalPages: number }> {
  const ids = await fetchStoryIds(type);
  const totalPages = Math.max(1, Math.ceil(ids.length / limit));
  const pageIds = ids.slice((page - 1) * limit, page * limit);
  const items = await Promise.all(pageIds.map((id) => fetchItem(id).catch(() => null)));
  const stories = items.filter((s): s is Story => !!s && (s.type === 'story' || s.type === 'job'));
  return { stories, totalPages };
}

/** Warms the item cache for a page so that navigating to it is instant. Errors are ignored. */
export function prefetchStories(type: StoryType, page: number, limit = 30): void {
  fetchStories(type, page, limit).catch(() => {});
}
