import { Component, OnInit, Inject } from '@angular/core';
import { Book, CurrentBook } from '../../types/book';
import { APIService } from '../API.service';
import { MatCarousel, MatCarouselComponent, MatCarouselSlide } from '@ngbmodule/material-carousel';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';




export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-current-book',
  templateUrl: './current-book.component.html',
  styleUrls: ['./current-book.component.css']
})
export class CurrentBookComponent implements OnInit {

  books: Array<CurrentBook>;
  selectedBook: CurrentBook;

  animal: string;
  name: string;


  color="primary";
  mode="determinate";

  currentPage = 0;
  totalPages: number = 1;
  startDate : Date = new Date();

  value= this.currentPage / this.totalPages;

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
      if(this.books){
        //arbitrarily select the top book
        // TODO: Select book most recently read
        this.selectedBook = this.books[0]
        console.log(this.selectedBook);
        this.totalPages = this.selectedBook.pages;
        this.currentPage = this.selectedBook.pageNumber;
        console.log(this.currentPage);

        this.startDate = new Date(this.selectedBook.startDate);
        // Get a percentage completed value for the progress wheel
        // TODO: check for infinity or zero lol
        if(this.currentPage === undefined){
          this.currentPage = 0;
        }
        if(this.totalPages === undefined){
          this.totalPages = 0;
        }
        if(this.currentPage >= this.totalPages){
          this.currentPage = this.totalPages;
        }
        this.value= Math.floor((this.currentPage / this.totalPages)*100);
      }else{
        //should display something if no books are in progress
      }
      console.log(this.books);

    });
  }

  onPageChange(val:string): void {
    let page : number = +val;
    if(page > 0 && page <= this.totalPages){
      this.currentPage = page;
      this.value = Math.floor((this.currentPage / this.totalPages)*100);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
      console.log(this.animal);
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOKClick(val:any): void {
    console.log(val);
    this.dialogRef.close();
  }

}
