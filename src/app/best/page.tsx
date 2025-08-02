import StoryList from '@/components/StoryList';
import { getBestStories } from '@/lib/hackernews';

export default async function BestStories({
  searchParams,
}: {
  searchParams: Promise<URLSearchParams>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.get('page') ?? '1');

  const { stories, totalPages } = await getBestStories(currentPage);

  return (
    <StoryList
      stories={stories}
      totalPages={totalPages}
      baseUrl="/best"
    />
  );
}
