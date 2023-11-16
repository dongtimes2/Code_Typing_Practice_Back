import { Type } from './practice.js';

export const RECORD_TYPE_LIST = ['stat', 'recent'];

export interface IRecord {
  id: string;
  userId: string;
  type: Type;
  language: string;
  accuracy: number;
  typingSpeed: number;
}
