import StoryList from '@/components/StoryList';
import { getBestStories } from '@/lib/hackernews';

interface PageProps {
  searchParams: { page?: string };
}

export default async function BestStories({ searchParams }: PageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const { stories, totalPages } = await getBestStories(currentPage);

  return (
    <StoryList
      stories={stories}
      totalPages={totalPages}
      baseUrl="/best"
    />
  );
} 