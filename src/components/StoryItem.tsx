'use client';

import React from 'react';
import type { Story } from '@/types/hackernews';
import TimeAgo from './TimeAgo';

const domainOf = (url?: string) => { try { return url ? new URL(url).hostname.replace(/^www\./, '') : ''; } catch { return ''; } };

export default function StoryItem({ story, rank }: { story: Story; rank: number }) {
  const hn = `https://news.ycombinator.com/item?id=${story.id}`;
  const href = story.url || hn;
  const domain = domainOf(story.url);
  const isJob = story.type === 'job';
  const isAsk = !story.url && !isJob;
  const comments = story.descendants ?? 0;

  return (
    <li className="item">
      <span className="rank">{rank}</span>
      <div>
        {isJob && <span className="chip">hiring</span>}
        {isAsk && <span className="chip">ask</span>}
        <a href={href} target="_blank" rel="noopener noreferrer" className="title">{story.title}</a>
        {domain && <a href={`https://news.ycombinator.com/from?site=${domain}`} target="_blank" rel="noopener noreferrer" className="domain">{domain}</a>}
      </div>
      <div className="meta">
        {!isJob && <span className="score"><svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 3l7 9h-4v5H7v-5H3z" /></svg>{story.score}</span>}
        {!isJob && (
          <a href={hn} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 5h14v8H9l-4 3v-3H3z" /></svg>
            {comments} {comments === 1 ? 'comment' : 'comments'}
          </a>
        )}
        <a href={`https://news.ycombinator.com/user?id=${story.by}`} target="_blank" rel="noopener noreferrer">{story.by}</a>
        <TimeAgo timestamp={story.time} />
      </div>
    </li>
  );
}
