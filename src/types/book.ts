export type Book = {
  id : string,
  title : string,
  description : string,
  author: string,
  tags: Array<string>,
  status: number,
  queue_pos: number,
  startDate: string,
  finishDate: string,
};
