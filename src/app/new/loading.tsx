'use client';

import StoryList from '@/components/StoryList';

export default function Loading() {
  return (
    <StoryList 
      stories={[]} 
      totalPages={0} 
      baseUrl="/new" 
    />
  );
} 