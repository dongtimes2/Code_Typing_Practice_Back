export const PRACTICE_TYPE_LIST = ['word', 'sentence'];

export type Type = 'word' | 'sentence';

export interface IPractice {
  id: string;
  type: Type;
  language: string;
  content: string;
}
