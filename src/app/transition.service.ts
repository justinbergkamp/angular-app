import { Injectable } from '@angular/core';
import { Book } from '../types/book';

@Injectable({
  providedIn: 'root'
})
export class TransitionService {

  constructor() { }

  convertToCurrent(book: Book):Book{
    book.pageNumber = 0;
    return book
  }
}
