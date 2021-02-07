import { Component, OnInit, ViewChild, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Book, CurrentBook } from '../../types/book';
import { Session } from '../../types/session';
import { APIService } from '../API.service';
import { MatCarousel, MatCarouselComponent, MatCarouselSlide } from '@ngbmodule/material-carousel';
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

  date: Date;
  startPage: number;
  endPage: number;

  session : Session;

  color="primary";
  mode="determinate";

  // coverImage = 'assets/a-promised-land-image.jpg';
  coverImage = 'assets/menu_book.svg';

  constructor(private api: APIService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getBooks();
    this.getQueuedBooks()

    /* subscribe to new books being updated */
    this.api.OnUpdateBookListener.subscribe( (event: any) => {
      // TODO: Check this event for failure
      console.log(event.value.data);
      this.selectedBook = event.value.data;
    });

  }

  getBooks(): void{
    // Query with filters, limits, and pagination
    let filter = {
      status: {
        eq: 2 // filter status = 2
      }
    };
    this.api.ListBooks(filter).then(event => {
      this.books = event.items;
      this.selectBook(this.books[0])
    });

  }


  getQueuedBooks(): void{
    // Query with filters, limits, and pagination
    let filter = {
      status: {
        eq: 1 // filter status = 2
      }
    };
        const limit =  10;
    this.api.ListBooks(filter, limit).then(event => {
      this.queuedBooks = event.items;
    });

  }

  selectBook(book:CurrentBook){
    this.selectedBook = book;
    return true;
  }


  calculatePercentage(currentPage : number , totalPages:number): number {
    if(currentPage === undefined){
      currentPage = 0;
    }
    if(totalPages === undefined){
      totalPages = 0;
    }
    if(currentPage >= totalPages){
      currentPage = totalPages;
    }
    let value = Math.floor((currentPage / totalPages)*100);
    return value;
  }


  openDialog(): void {
    this.date = new Date();
    const dialogRef = this.dialog.open(SessionDialogComponent, {
      width: '500px',
      data: {date: this.date, startPage: this.selectedBook.pageNumber, endPage: this.endPage}
    });

    const sub = dialogRef.componentInstance.onAdd.subscribe((data) => {
      console.log(data);
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

  openTransitionDialog(book: Book): void {
    this.date = new Date();
    const dialogRef = this.dialog.open(TransitionDialogComponent, {
      width: '500px',
      data: book
    });

    // const sub = dialogRef.componentInstance.onAdd.subscribe((data) => {
    //   console.log(data);
    //   if(this.verifySession(data)){
    //     dialogRef.close();
    //     this.addSession(data);
    //   }else{
    //     alert("The end page must be greater than the beginning page!")
    //   }
    // });

    dialogRef.afterClosed().subscribe(result => {
        // sub.unsubscribe();
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
