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
  allBooks: Array<Book>;
  toReadBooks: Array<Book>;
  queuedBooks: Array<Book>;
  completedBooks: Array<Book>;

  myFlagForButtonToggle: Array<String> = [];
  endpointToggleOptions: Array<String> = ["Backlog", "Enqueued", "Current", "Done"];

  selectedBook: Book;

  constructor(private api: APIService) { }

  ngOnInit(): void {
    this.api.ListBooks().then(event => {
      this.books = event.items;
      this.books.sort((a, b) => a.queue_pos < b.queue_pos ? -1 : a.queue_pos > b.queue_pos ? 1 : 0);
      this.allBooks = this.books;

    });

    this.api.OnCreateBookListener.subscribe( (event: any) => {
      const newBook = event.value.data.onCreateBook;
      this.books = [newBook, ...this.books];
      this.books.sort((a, b) => a.queue_pos < b.queue_pos ? -1 : a.queue_pos > b.queue_pos ? 1 : 0)
      this.allBooks = this.books;

    });
  }

  onSelect(book: Book): void {
    this.mode = 'details';
    this.selectedBook = book;
  }

  addBook(){
    this.mode = 'add';
  }


  public onFilterChange(val){

    let selectedBooks = [];
    if (val !=''){
      for(let filter of val){

        let filteredBooks = this.allBooks.filter(book => book.status == filter);

        selectedBooks = selectedBooks.concat(filteredBooks);

      }
    }else{
      selectedBooks = this.allBooks;
    }
    this.books = selectedBooks;
  }

}
