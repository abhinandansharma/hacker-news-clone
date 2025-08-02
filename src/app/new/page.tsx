import StoryList from '@/components/StoryList';
import { getNewStories } from '@/lib/hackernews';

export default async function NewStories() {
  const { stories, totalPages } = await getNewStories(1);

  return (
    <StoryList
      stories={stories}
      totalPages={totalPages}
      baseUrl="/new"
    />
  );
} 