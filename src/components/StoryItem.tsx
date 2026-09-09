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
  const comments = story.descendants ?? 0;

  return (
    <li className="item">
      <span className="rank" aria-hidden="true">{rank}</span>
      <div className="body">
        <p className="head">
          <a href={href} target="_blank" rel="noopener noreferrer" className="title">{story.title}</a>
          {domain && <a href={`https://news.ycombinator.com/from?site=${domain}`} target="_blank" rel="noopener noreferrer" className="domain">{domain}</a>}
        </p>
        <p className="meta">
          {isJob ? (
            <span className="tag">Hiring</span>
          ) : (
            <>
              <span className="score" title="Points"><b className="num">{story.score}</b> points</span>
              <a href={hn} target="_blank" rel="noopener noreferrer" className="comments"><b className="num">{comments}</b> {comments === 1 ? 'comment' : 'comments'}</a>
            </>
          )}
          <a href={`https://news.ycombinator.com/user?id=${story.by}`} target="_blank" rel="noopener noreferrer" className="by">{story.by}</a>
          <TimeAgo timestamp={story.time} />
        </p>
      </div>
    </li>
  );
}
