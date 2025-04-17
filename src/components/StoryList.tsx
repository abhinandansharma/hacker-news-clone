'use client';

import React from 'react';
import { Story } from '@/types/hackernews';
import StoryItem from './StoryItem';
import Pagination from './Pagination';

interface StoryListProps {
  stories: Story[];
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  isLoading?: boolean;
}

export default function StoryList({ 
  stories, 
  currentPage, 
  totalPages, 
  baseUrl,
  isLoading = false 
}: StoryListProps) {
  if (isLoading) {
    return (
      <div className="relative bg-white/50 backdrop-blur-sm rounded-lg shadow-sm divide-y divide-gray-100">
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
        </div>
        {[...Array(10)].map((_, i) => (
          <div key={i} className="p-4 animate-pulse">
            <div className="flex items-baseline gap-2">
              <div className="h-5 bg-gray-200/50 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200/50 rounded w-1/4"></div>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-3 bg-gray-200/50 rounded w-16"></div>
              <div className="h-3 bg-gray-200/50 rounded w-24"></div>
              <div className="h-3 bg-gray-200/50 rounded w-20"></div>
              <div className="h-3 bg-gray-200/50 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-sm divide-y divide-gray-100">
      {stories.map((story) => (
        <StoryItem key={story.id} story={story} />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl={baseUrl}
      />
    </div>
  );
} 