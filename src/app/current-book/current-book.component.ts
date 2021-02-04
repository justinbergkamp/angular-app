import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Book, CurrentBook } from '../../types/book';
import { Session } from '../../types/session';
import { APIService } from '../API.service';
import { MatCarousel, MatCarouselComponent, MatCarouselSlide } from '@ngbmodule/material-carousel';
import { SessionDialogComponent } from '../session-dialog/session-dialog.component';
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
  }

  getBooks(): void{
    this.api.ListBooks().then(event => {
      this.books = event.items;
      //this will filter only books with status 2 : IE current books
      this.books = this.books.filter(book => book.status == 2);
      this.populateSlide();

    });
  }

  selectBook(book:CurrentBook){
    this.selectedBook = book;
    return true;
  }

  populateSlide():void {
    if(this.books){
      //arbitrarily select the top book
      // TODO: Select book most recently read
      // this.selectedBook = this.books[0]

    }else{
      //should display something if no books are in progress
    }
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
      }
      this.addSession(data);
    });

    dialogRef.afterClosed().subscribe(result => {
        sub.unsubscribe();
    });
  }

  verifySession(data : Session): boolean{
    // TODO: endPage >= startPage / pages haven't been already read
    return true;
  }

  addSession(data : Session): void{
    //Cast CurrentBook to Book
    // Add Session from data
    // Update book with latest Session / New Current Page
    let updatedBook : any ;
    let newSession = _.omit(data, ['__typename']);
    updatedBook = _.omit(updatedBook, ['__typename', 'createdAt', 'updatedAt']);

    updatedBook = this.selectedBook;
    updatedBook.sessions.push(newSession);
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
