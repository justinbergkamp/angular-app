
import { Session } from './session';

export type Book = {
  id : string,
  title : string,
  description : string,
  author: string,
  tags: Array<string>,
  status: number,
  queue_pos: number,
  pages: number;
  pageNumber: number,
  startDate: string,
  goalFinishDate: string,
  finishDate: string
  sessions: Array<Session>

};

export type BacklogBook = {
  id : string,
  title : string,
  description : string,
  author: string,
  tags: Array<string>,
  status: number,
  pages: number
};

export type QueueBook = {
  id : string,
  title : string,
  description : string,
  author: string,
  tags: Array<string>,
  status: number,
  pages: number,
  queue_pos: number
};

export type CurrentBook = {
  id : string,
  title : string,
  description : string,
  author: string,
  tags: Array<string>,
  status: number,
  pageNumber: number,
  pages: number,
  startDate: string,
  goalFinishDate: string,
  sessions: Array<Session>
};

export type DoneBook = {
  id : string,
  title : string,
  description : string,
  author: string,
  tags: Array<string>,
  status: number,
  pageNumber: number,
  pages: number,
  startDate: string,
  finishDate: string
};
