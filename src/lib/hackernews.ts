const ITEMS_PER_PAGE = 30;
const TOTAL_ITEMS = 500; // HN API returns 500 stories max

const fetchConfig = {
  next: { revalidate: 60 }, // Revalidate every 60 seconds
  headers: {
    'Content-Type': 'application/json',
  },
};

async function fetchStories(endpoint: string, page: number) {
  try {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/${endpoint}.json`, fetchConfig);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}`);
    }
    const storyIds = await response.json();
    
    const stories = await Promise.all(
      storyIds.slice(start, end).map(async (id: number) => {
        try {
          const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, fetchConfig);
          if (!storyResponse.ok) {
            throw new Error(`Failed to fetch story ${id}`);
          }
          return storyResponse.json();
        } catch (error) {
          console.error(`Error fetching story ${id}:`, error);
          return null;
        }
      })
    );
    
    // Filter out any null stories (failed fetches)
    const validStories = stories.filter(story => story !== null);
    
    return {
      stories: validStories,
      totalPages: Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE)
    };
  } catch (error) {
    console.error(`Error in fetchStories:`, error);
    return {
      stories: [],
      totalPages: 0
    };
  }
}

export async function getTopStories(page: number) {
  return fetchStories('topstories', page);
}

export async function getNewStories(page: number) {
  return fetchStories('newstories', page);
}

export async function getBestStories(page: number) {
  return fetchStories('beststories', page);
} 