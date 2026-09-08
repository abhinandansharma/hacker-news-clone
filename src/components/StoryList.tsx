'use client';

import React from 'react';
import StoryItem from './StoryItem';
import Pagination from './Pagination';
import type { Story } from '@/types/hackernews';

interface Props {
  stories: Story[];
  loading: boolean;
  totalPages: number;
  currentPage: number;
  baseUrl: string;
  startRank: number;
}

export default function StoryList({ stories, loading, totalPages, currentPage, baseUrl, startRank }: Props) {
  return (
    <>
      <ul className="list">
        {loading && Array.from({ length: 12 }, (_, i) => (
          <li key={i} className="sk" aria-hidden="true">
            <span style={{ width: '1.6rem', marginLeft: 'auto' }} />
            <div><span style={{ width: `${55 + ((i * 17) % 40)}%` }} /><span style={{ width: '38%', marginTop: '0.5rem', height: '0.65rem' }} /></div>
          </li>
        ))}
        {!loading && stories.length === 0 && <li className="empty">Nothing here yet.</li>}
        {!loading && stories.map((story, i) => <StoryItem key={story.id} story={story} rank={startRank + i + 1} />)}
      </ul>
      <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl={baseUrl} />
    </>
  );
}
