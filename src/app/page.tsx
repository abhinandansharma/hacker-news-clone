import StoryList from '@/components/StoryList';
import { getTopStories } from '@/lib/hackernews';

export default async function Home() {
  const { stories, totalPages } = await getTopStories(1);

  return (
    <StoryList
      stories={stories}
      currentPage={1}
      totalPages={totalPages}
      baseUrl="/"
    />
  );
} 