import { Component, OnInit } from '@angular/core';
import { APIService } from '../API.service';
import { Book } from '../../types/book';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {UpdateDialogComponent} from '../update-dialog/update-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  addMode : Boolean = false;
  detailsMode : Boolean = false;


  books: Array<Book>;
  backlogBooks: Array<Book>;
  queuedBooks: Array<Book>;
  completedBooks: Array<Book>;


  selectedBook: Book;


  constructor(private api: APIService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listBooks();

    this.api.OnCreateBookListener.subscribe( (event: any) => {
      this.listBooks();
    });

    this.api.OnDeleteBookListener.subscribe( (event: any) => {
      this.listBooks();
    });
  }

  listBooks(): void{
    this.api.ListBooks().then(event => {
      this.books = event.items;
      this.backlogBooks = this.books.filter(book => book.status == 0);
      console.log(this.backlogBooks);

      this.queuedBooks = this.books.filter(book => book.status == 1);
      this.completedBooks = this.books.filter(book => book.status == 3);
    });
  }

  onSelect(book: Book): void {
    //shoukd recieve emit
    // this.mode = 'details';
    // this.selectedBook = book;
  }



  addBook(): void {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '500px',
      data: {book: "", action: "add"}
    });

    const sub = dialogRef.componentInstance.onAdd.subscribe((data) => {
        dialogRef.close();

        dialogRef.afterClosed().subscribe(result => {
          sub.unsubscribe();
        });
    });
  }

}
