import { Component, OnInit, ViewChild, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Book, CurrentBook } from '../../types/book';
import { Session } from '../../types/session';
import { APIService } from '../API.service';
import { TransitionService } from '../transition.service';

import { SessionDialogComponent } from '../session-dialog/session-dialog.component';
import { TransitionDialogComponent } from '../transition-dialog/transition-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as _ from 'lodash';


@Component({
  selector: 'app-current-book',
  templateUrl: './current-book.component.html',
  styleUrls: ['./current-book.component.css']
})
export class CurrentBookComponent implements OnInit {

  books: Array<CurrentBook>;
  selectedBook: CurrentBook;
  queuedBooks : Array<Book>;

  currentSlide = 0;

  date: Date;
  startPage: number;
  endPage: number;

  session : Session;


  constructor(private api: APIService, public dialog: MatDialog, private transitionService :TransitionService) { }

  ngOnInit(): void {
    this.getBooks();
    this.getQueuedBooks()

    /* subscribe to new books being updated */
    this.api.OnUpdateBookListener.subscribe( (event: any) => {
      // TODO: Check this event for failure
      console.log("A book was updated");
      console.log(event.value.data.onUpdateBook);
      this.selectedBook = event.value.data.onUpdateBook;
      this.books[this.currentSlide] =   this.selectedBook;
    });

  }

  getBooks(): void{
    // Query with filters, limits, and pagination
    let filter = { status: { eq: 2 }  };

    this.api.ListBooks(filter).then(event => {
      this.books = event.items;
      // TODO: sort by most amount of pages
      this.selectedBook = this.books[0]
    });

  }


  getQueuedBooks(): void{
    // Query with filters, limits, and pagination
    let filter = { status: {  eq: 1  } };
        const limit =  10;
    this.api.ListBooks(filter, limit).then(event => {
      // TODO: sort by queue pos
      this.queuedBooks = event.items;
    });

  }

  onSlideChange(slideVal : number){
    this.selectedBook = this.books[slideVal];
    this.currentSlide = slideVal;
  }


  openDialog(): void {
    this.date = new Date();
    const dialogRef = this.dialog.open(SessionDialogComponent, {
      width: '500px',
      data: {date: this.date, startPage: this.selectedBook.pageNumber, endPage: this.endPage}
    });

    const sub = dialogRef.componentInstance.onAdd.subscribe((data) => {
      let verifyResult = this.verifySession(data);
      if(verifyResult == 0){
        dialogRef.close();
        this.addSession(data);
      }else{
        let sessionErrors = [
          "The end page must be greater than the beginning page!",
          "The end page can't exceed the number of pages in the book!",
          "The start page needs to be greater than zero!"
        ];
        alert(sessionErrors[verifyResult-1])
      }
    });

    dialogRef.afterClosed().subscribe(result => {
        sub.unsubscribe();
    });
  }

  transition(status: number){
    // TODO: Ask for confirmation via more robust dialog
    let message = "Are you sure?";
    if(status == 3){
      console.log("Moving book to done");
      message = "Are you sure you want to move "+this.selectedBook.title+" to done?"
      if(this.selectedBook.pageNumber < this.selectedBook.pages){
        message = "You haven't completed the book yet. Are you sure you want to move "+this.selectedBook.title+" to done?"
      }
    }
    if(status == 1){
      console.log("Moving book to queue");
      message = "Are you sure you want to move "+this.selectedBook.title+" back to the Queue? Some data will be lost."
    }
    if(confirm(message)) {
      if(status == 1){
        this.transitionService.moveToQueue(this.selectedBook, status);
      }
      if(status == 3){
        this.transitionService.moveToDone(this.selectedBook, status);
      }
      // TODO: Remove from books list
    }

  }

  openTransitionDialog(book: Book, status: number): void {
    this.date = new Date();
    const dialogRef = this.dialog.open(TransitionDialogComponent, {
      width: '500px',
      data: {book: book, status:status}
    });


    dialogRef.afterClosed().subscribe(result => {
      // TODO: Handle errors
    });
  }

  verifySession(data : Session): number{
    // TODO: endPage >= startPage / pages haven't been already read
    if(data.endPage <= data.startPage){
      return 1;
    }
    if(this.selectedBook.pages < data.endPage){
      return 2;
    }
    if(data.startPage <= -1){
      return 3;
    }
    return 0;
  }

  addSession(data : Session): void{
    //Cast CurrentBook to Book
    // Add Session from data
    // Update book with latest Session / New Current Page
    let updatedBook : any ;
    updatedBook = this.selectedBook;
    updatedBook = _.omit(updatedBook, ['__typename', 'createdAt', 'updatedAt']);

    let newSession = _.omit(data, ['__typename']);
    if(!updatedBook.sessions){ updatedBook.sessions = []; }
    updatedBook.sessions.push(newSession);

    for (var index in updatedBook.sessions) {
      let newSesh = _.omit(updatedBook.sessions[index], ['__typename']);
      updatedBook.sessions[index] = newSesh;
    }

    updatedBook.pageNumber = newSession.endPage;

    console.log("Updated Book");
    console.log(updatedBook);
    this.api.UpdateBook(updatedBook).then(event => {
      console.log('item updated!');
    })
    .catch(e => {
      console.log('error updating book...', e);
    });
  }

}
