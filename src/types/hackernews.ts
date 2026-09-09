export interface Story {
  id: number;
  title: string;
  url?: string;
  text?: string;
  score: number;
  time: number;
  by: string;
  descendants?: number;
  kids?: number[];
  type: 'story' | 'job';
}

export type StoryType = 'top' | 'new' | 'best' | 'ask' | 'show' | 'job';

export const FEEDS: { type: StoryType; label: string; title: string; blurb: string; path: string; endpoint: string }[] = [
  { type: 'top', label: 'Top', title: 'Top', blurb: 'The front page, ranked by Hacker News right now.', path: '/', endpoint: 'topstories' },
  { type: 'new', label: 'New', title: 'New', blurb: 'The newest submissions, latest first.', path: '/new/', endpoint: 'newstories' },
  { type: 'best', label: 'Best', title: 'Best', blurb: 'The highest-voted stories of the last few days.', path: '/best/', endpoint: 'beststories' },
  { type: 'ask', label: 'Ask', title: 'Ask HN', blurb: 'Questions and discussions put to the community.', path: '/ask/', endpoint: 'askstories' },
  { type: 'show', label: 'Show', title: 'Show HN', blurb: 'Things people built and want you to try.', path: '/show/', endpoint: 'showstories' },
  { type: 'job', label: 'Jobs', title: 'Jobs', blurb: 'Hiring posts from Y Combinator startups.', path: '/jobs/', endpoint: 'jobstories' },
];
