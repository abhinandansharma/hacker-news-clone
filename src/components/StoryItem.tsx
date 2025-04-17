'use client';

import React from 'react';
import { Story } from '@/types/hackernews';
import TimeAgo from './TimeAgo';
import { ArrowUpIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

interface StoryItemProps {
  story: Story;
}

export default function StoryItem({ story }: StoryItemProps) {
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return '';
    }
  };

  return (
    <div className="p-4 hover:bg-gray-50/50 dark:hover:bg-[#1F2937]/50 transition-colors duration-200">
      <div className="flex items-baseline gap-2">
        <a
          href={story.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base font-medium text-[rgb(var(--accent-rgb))] hover:underline"
        >
          {story.title}
        </a>
        {story.url && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({getDomain(story.url)})
          </span>
        )}
      </div>
      <div className="mt-2 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <ArrowUpIcon className="h-4 w-4" />
          <span>{story.score} points</span>
        </div>
        <div className="flex items-center gap-1">
          <ChatBubbleLeftIcon className="h-4 w-4" />
          <span>{story.descendants} comments</span>
        </div>
        <div>
          by{' '}
          <a
            href={`https://news.ycombinator.com/user?id=${story.by}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[rgb(var(--accent-rgb))] hover:underline"
          >
            {story.by}
          </a>
        </div>
        <TimeAgo timestamp={story.time} />
      </div>
    </div>
  );
} 