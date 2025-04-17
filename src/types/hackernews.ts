export interface Story {
  id: number;
  title: string;
  url: string;
  score: number;
  time: number;
  by: string;
  descendants: number;
  kids?: number[];
  type: 'story';
}

export type StoryType = 'top' | 'new' | 'best';

export interface Comment {
  id: number;
  text: string;
  by: string;
  time: number;
  kids?: number[];
  parent: number;
  type: 'comment';
} 