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
  value="95";

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
      }
      console.log(this.books);

    });
  }

}
