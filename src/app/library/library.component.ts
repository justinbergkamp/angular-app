import { Component, OnInit } from '@angular/core';
import { APIService } from '../API.service';
import { Book } from '../../types/book';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  mode = '';

  books: Array<Book>;
  toReadBooks: Array<Book>;
  queuedBooks: Array<Book>;
  completedBooks: Array<Book>;

  myFlagForButtonToggle: Array<String> = [];
  endpointToggleOptions: Array<String> = ["To-Read", "Read"];

  selectedBook: Book;

  constructor(private api: APIService) { }

  ngOnInit(): void {
    this.api.ListBooks().then(event => {
      this.books = event.items;
    });

    this.api.OnCreateBookListener.subscribe( (event: any) => {
      const newBook = event.value.data.onCreateBook;
      this.books = [newBook, ...this.books];
      this.books.sort((a, b) => a.queue_pos < b.queue_pos ? -1 : a.queue_pos > b.queue_pos ? 1 : 0)

    });
  }

  onSelect(book: Book): void {
    this.mode = 'details';
    this.selectedBook = book;
  }

  public onFilterChange(val){

    let selectedBooks = [];
    if (val !=''){
      for(let filter of val){

        let filteredBooks = this.books.filter(book => book.status == filter);

        selectedBooks = selectedBooks.concat(filteredBooks);

      }
    }else{
      selectedBooks = this.books;
    }
    this.books = selectedBooks;
  }

}
