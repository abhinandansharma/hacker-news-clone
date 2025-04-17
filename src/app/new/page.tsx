import StoryList from '@/components/StoryList';
import { getNewStories } from '@/lib/hackernews';

export default async function NewStories() {
  const { stories, totalPages } = await getNewStories(1);

  return (
    <StoryList
      stories={stories}
      currentPage={1}
      totalPages={totalPages}
      baseUrl="/new"
    />
  );
} 