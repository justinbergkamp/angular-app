import { Component, OnInit, ViewChild, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Book, CurrentBook } from '../../types/book';
import { Session } from '../../types/session';
import { APIService } from '../API.service';
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


  constructor(private api: APIService, public dialog: MatDialog) { }

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
      this.queuedBooks = event.items;
    });

  }

  onSlideChange(slideVal : number){
    console.log(`Slide changed to ${slideVal}`);
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
      if(this.verifySession(data)){
        dialogRef.close();
        this.addSession(data);
      }else{
        alert("The end page must be greater than the beginning page!")
      }
    });

    dialogRef.afterClosed().subscribe(result => {
        sub.unsubscribe();
    });
  }

  test(){
    console.log("Hm");

  }

  openTransitionDialog(book: Book): void {
    this.date = new Date();
    const dialogRef = this.dialog.open(TransitionDialogComponent, {
      width: '500px',
      data: book
    });


    dialogRef.afterClosed().subscribe(result => {
      // TODO: Handle errors
    });
  }

  verifySession(data : Session): boolean{
    // TODO: endPage >= startPage / pages haven't been already read
    if(data.endPage <= data.startPage){
      return false;
    }
    return true;
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
