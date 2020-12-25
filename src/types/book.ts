export type Book = {
  id : string,
  title : string,
  description : string,
  author: string,
  tags: Array<string>,
  status: string,
  queue_pos: number
};
