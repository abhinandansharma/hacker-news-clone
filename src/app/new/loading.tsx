import StoryList from '@/components/StoryList';

export default function Loading() {
  return (
    <StoryList 
      stories={[]} 
      currentPage={1} 
      totalPages={0} 
      baseUrl="/new" 
      isLoading={true} 
    />
  );
} 