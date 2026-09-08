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

export const FEEDS: { type: StoryType; label: string; path: string; endpoint: string }[] = [
  { type: 'top', label: 'Top', path: '/', endpoint: 'topstories' },
  { type: 'new', label: 'New', path: '/new/', endpoint: 'newstories' },
  { type: 'best', label: 'Best', path: '/best/', endpoint: 'beststories' },
  { type: 'ask', label: 'Ask', path: '/ask/', endpoint: 'askstories' },
  { type: 'show', label: 'Show', path: '/show/', endpoint: 'showstories' },
  { type: 'job', label: 'Jobs', path: '/jobs/', endpoint: 'jobstories' },
];
