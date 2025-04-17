'use client';

import React from 'react';
import StoryItem from './StoryItem';
import Pagination from './Pagination';
import { Story } from '@/types/hackernews';
import { useSearchParams } from 'next/navigation';

interface StoryListProps {
  stories: Story[];
  totalPages: number;
  baseUrl: string;
}

export default function StoryList({ stories, totalPages, baseUrl }: StoryListProps) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  return (
    <div className="space-y-6">
      <div className="bg-[rgb(var(--card-bg))]/50 backdrop-blur-sm rounded-lg shadow-sm border border-[rgb(var(--border-rgb))] p-4 relative overflow-hidden">
        {/* Border glow effect */}
        <div className="absolute inset-0 rounded-lg border border-[rgb(var(--accent-rgb),0.2)] pointer-events-none" />
        <div className="absolute inset-0 rounded-lg border border-[rgb(var(--accent-rgb),0.1)] pointer-events-none" />
        
        <div className="relative">
          {stories.length === 0 ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[rgb(var(--accent-rgb))]"></div>
            </div>
          ) : (
            <ul className="divide-y divide-[rgb(var(--border-rgb))]">
              {stories.map((story) => (
                <StoryItem key={story.id} story={story} />
              ))}
            </ul>
          )}
        </div>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl={baseUrl} />
    </div>
  );
} 