import { Component, OnInit } from '@angular/core';
import { Book } from '../../types/book';
import { APIService } from '../API.service';
import { MatCarousel, MatCarouselComponent, MatCarouselSlide } from '@ngbmodule/material-carousel';

@Component({
  selector: 'app-current-book',
  templateUrl: './current-book.component.html',
  styleUrls: ['./current-book.component.css']
})
export class CurrentBookComponent implements OnInit {

  books: Array<Book>;
  selectedBook: Book;

  color="primary";
  mode="determinate";

  currentPage = 0;
  totalPages: number = 1;
  startDate : Date = new Date();

  value= this.currentPage / this.totalPages;


  constructor(private api: APIService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void{
    this.api.ListBooks().then(event => {
      this.books = event.items;
      this.books = this.books.filter(book => book.status == 2);
      if(this.books){
        this.selectedBook = this.books[0]
        this.totalPages = this.selectedBook.pageNumber;
        this.startDate = new Date(this.selectedBook.startDate);
        this.value= Math.floor((this.currentPage / this.totalPages)*100);
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

}
