import { Story, StoryType } from '@/types/hackernews';

const API_BASE = 'https://hacker-news.firebaseio.com/v0';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Cache for story IDs
const storyIdsCache: Record<StoryType, { ids: number[]; timestamp: number }> = {
  top: { ids: [], timestamp: 0 },
  new: { ids: [], timestamp: 0 },
  best: { ids: [], timestamp: 0 },
};

// Cache for individual stories
const storiesCache: Record<number, { story: Story; timestamp: number }> = {};

export async function fetchItem<T>(id: number): Promise<T> {
  // Check cache first
  if (storiesCache[id] && Date.now() - storiesCache[id].timestamp < CACHE_DURATION) {
    return storiesCache[id].story as T;
  }

  const response = await fetch(`${API_BASE}/item/${id}.json`);
  if (!response.ok) {
    throw new Error('Failed to fetch item');
  }
  const data = await response.json();
  
  // Cache the story
  storiesCache[id] = {
    story: data,
    timestamp: Date.now(),
  };
  
  return data;
}

export async function fetchStoryIds(type: StoryType): Promise<number[]> {
  // Check cache first
  if (storyIdsCache[type].ids.length > 0 && 
      Date.now() - storyIdsCache[type].timestamp < CACHE_DURATION) {
    return storyIdsCache[type].ids;
  }

  const response = await fetch(`${API_BASE}/${type}stories.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${type} stories`);
  }
  const ids = await response.json();
  
  // Cache the IDs
  storyIdsCache[type] = {
    ids,
    timestamp: Date.now(),
  };
  
  return ids;
}

export async function fetchStories(type: StoryType, page: number, limit: number = 30): Promise<Story[]> {
  const ids = await fetchStoryIds(type);
  const start = (page - 1) * limit;
  const end = start + limit;
  const pageIds = ids.slice(start, end);
  
  // Fetch stories in parallel with a concurrency limit
  const concurrencyLimit = 10;
  const stories: Story[] = [];
  
  for (let i = 0; i < pageIds.length; i += concurrencyLimit) {
    const batch = pageIds.slice(i, i + concurrencyLimit);
    const batchPromises = batch.map(id => fetchItem<Story>(id));
    const batchResults = await Promise.all(batchPromises);
    stories.push(...batchResults.filter(story => story && story.type === 'story'));
  }
  
  return stories;
} 