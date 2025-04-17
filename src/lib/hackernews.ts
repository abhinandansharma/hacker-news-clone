const ITEMS_PER_PAGE = 30;
const TOTAL_ITEMS = 500; // HN API returns 500 stories max

const fetchConfig = {
  next: { revalidate: 60 }, // Revalidate every 60 seconds
  headers: {
    'Content-Type': 'application/json',
  },
};

export async function getTopStories(page: number) {
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  
  const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json', fetchConfig);
  if (!response.ok) {
    throw new Error('Failed to fetch top stories');
  }
  const storyIds = await response.json();
  
  const stories = await Promise.all(
    storyIds.slice(start, end).map(async (id: number) => {
      const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, fetchConfig);
      if (!storyResponse.ok) {
        throw new Error(`Failed to fetch story ${id}`);
      }
      return storyResponse.json();
    })
  );
  
  return {
    stories,
    totalPages: Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE)
  };
}

export async function getNewStories(page: number) {
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  
  const response = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json', fetchConfig);
  if (!response.ok) {
    throw new Error('Failed to fetch new stories');
  }
  const storyIds = await response.json();
  
  const stories = await Promise.all(
    storyIds.slice(start, end).map(async (id: number) => {
      const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, fetchConfig);
      if (!storyResponse.ok) {
        throw new Error(`Failed to fetch story ${id}`);
      }
      return storyResponse.json();
    })
  );
  
  return {
    stories,
    totalPages: Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE)
  };
}

export async function getBestStories(page: number) {
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  
  const response = await fetch('https://hacker-news.firebaseio.com/v0/beststories.json', fetchConfig);
  if (!response.ok) {
    throw new Error('Failed to fetch best stories');
  }
  const storyIds = await response.json();
  
  const stories = await Promise.all(
    storyIds.slice(start, end).map(async (id: number) => {
      const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, fetchConfig);
      if (!storyResponse.ok) {
        throw new Error(`Failed to fetch story ${id}`);
      }
      return storyResponse.json();
    })
  );
  
  return {
    stories,
    totalPages: Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE)
  };
} 