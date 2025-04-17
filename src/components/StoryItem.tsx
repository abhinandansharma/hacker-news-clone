import React from 'react';
import { Story } from '@/types/hackernews';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import TimeAgo from './TimeAgo';

interface StoryItemProps {
  story: Story;
}

export default function StoryItem({ story }: StoryItemProps) {
  const hostname = story.url ? new URL(story.url).hostname : null;

  return (
    <article className="p-4 hover:bg-white/80 transition-colors duration-200">
      <div className="flex items-baseline gap-2">
        <h2 className="text-base font-medium flex-grow">
          <Link 
            href={story.url || `https://news.ycombinator.com/item?id=${story.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-orange-600 flex items-center gap-1"
          >
            {story.title}
            <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 inline text-gray-400" />
          </Link>
        </h2>
        {hostname && (
          <span className="text-xs text-gray-500">
            ({hostname})
          </span>
        )}
      </div>
      <div className="mt-1.5 text-xs text-gray-600 flex items-center gap-3">
        <span className="text-gray-700 font-medium">{story.score} points</span>
        <span>by <span className="text-gray-800 font-medium">{story.by}</span></span>
        <TimeAgo timestamp={story.time} />
        <Link
          href={`https://news.ycombinator.com/item?id=${story.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-gray-700 hover:text-orange-600"
        >
          <ChatBubbleLeftIcon className="h-3.5 w-3.5" />
          {story.descendants} comments
        </Link>
      </div>
    </article>
  );
} 