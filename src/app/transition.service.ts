import { Injectable } from '@angular/core';
import { Book, CurrentBook } from '../types/book';

@Injectable({
  providedIn: 'root'
})
export class TransitionService {

  constructor() { }

  convert(book: Book):Book{
    let currentBook : CurrentBook = book;
    console.log("Cast currentBook");
    book.pageNumber = 0;
    return book
  }
}
