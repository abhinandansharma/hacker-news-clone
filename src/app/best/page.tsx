import StoryList from '@/components/StoryList';
import { getBestStories } from '@/lib/hackernews';

export default async function BestStories() {
  const { stories, totalPages } = await getBestStories(1);

  return (
    <StoryList
      stories={stories}
      currentPage={1}
      totalPages={totalPages}
      baseUrl="/best"
    />
  );
} 