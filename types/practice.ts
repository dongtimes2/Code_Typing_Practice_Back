export const PRACTICE_TYPE_LIST = ['word', 'short', 'long'];

export type Type = 'word' | 'short' | 'long';

export interface IPractice {
  id: string;
  type: Type;
  language: string;
  content: string;
}
