import { Injectable, Output, EventEmitter } from '@angular/core';
import { Book, CurrentBook } from '../types/book';
import * as _ from 'lodash';
import { APIService } from './API.service';

@Injectable({
  providedIn: 'root'
})
export class TransitionService {

  @Output() onUpdate = new EventEmitter();


  constructor(private api: APIService) { }

  convert(book: Book):Book{
    let currentBook : CurrentBook = book;
    console.log("Cast currentBook");
    book.pageNumber = 0;
    return book
  }

  moveToDone(book: any, status: number):void{

    let updatedBook = book;
    updatedBook.status = 3;
    updatedBook.finishDate = new Date();
    updatedBook = _.omit(updatedBook, ['__typename', 'createdAt', 'updatedAt']);
    this.api.UpdateBook(updatedBook).then(event => {
      console.log('item updated!');
      this.onUpdate.emit("done");
    })
    .catch(e => {
      console.log('error updating book...', e);
    });

  }

  moveToQueue(book: any, status: number):void{
    console.log("UPDATE");
    // Move to Queue from Current
    // Add Queue Pos
    // Save pages
    // Should I save Session info & Current Page?
    // For now I'm going to delete data for simplicity

    let updatedBook = book;
    updatedBook.sessions = [];
    updatedBook.pageNumber = 0;
    updatedBook.startDate = '';
    updatedBook.status = 1;
    updatedBook = _.omit(updatedBook, ['__typename', 'createdAt', 'updatedAt']);
    this.api.UpdateBook(updatedBook).then(event => {
      console.log('item updated!');
      this.onUpdate.emit("done");
    })
    .catch(e => {
      console.log('error updating book...', e);
    });

  }
}
