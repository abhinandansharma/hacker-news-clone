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
  /** Stories in the live feed that are not on screen yet. */
  pendingCount?: number;
  hasPending?: boolean;
  onApplyPending?: () => void;
}

const SKELETON = 30;

export default function StoryList({ stories, loading, totalPages, currentPage, baseUrl, startRank, pendingCount = 0, hasPending = false, onApplyPending }: Props) {
  const maxScore = Math.max(1, ...stories.map((s) => s.score || 0));
  return (
    <>
      <div className="list-top" aria-live="polite">
        {hasPending && (
          <button type="button" className="btn btn-live" onClick={onApplyPending}>
            <i aria-hidden="true" />
            {pendingCount > 0 ? <>{pendingCount} new {pendingCount === 1 ? 'story' : 'stories'}. Show the latest order</> : <>The order changed. Show the latest order</>}
          </button>
        )}
      </div>
      <ol className="list" start={startRank + 1}>
        {loading && Array.from({ length: SKELETON }, (_, i) => (
          <li key={i} className="sk" aria-hidden="true">
            <span className="sk-rank" />
            <div><span style={{ width: `${48 + ((i * 23) % 44)}%` }} /><span className="sk-meta" /></div>
          </li>
        ))}
        {!loading && stories.length === 0 && <li className="notice">Nothing here yet.</li>}
        {!loading && stories.map((story, i) => <StoryItem key={story.id} story={story} rank={startRank + i + 1} share={(story.score || 0) / maxScore} />)}
      </ol>
      <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl={baseUrl} />
    </>
  );
}
