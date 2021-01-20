import { Component, OnInit } from '@angular/core';
import { APIService } from '../API.service';
import { Book } from '../../types/book';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


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



  selectedBook: Book;
  allTags: string[] = ['Science', 'Fantasy', 'History', 'Philosophy', 'Self-Improvement'];

  myFlagForButtonToggle: Array<String> = [];
  endpointToggleOptions: Array<String> = this.allTags;

  tagInformation = new Map([
          ["Science",    {color: "blue" , nickname : "S"}],
          ["Fantasy",    {color: "red" , nickname : "F"}],
          ["History",    {color: "pink" , nickname : "H"}],
          ["Philosophy", {color: "purple" , nickname : "P"}],
          ["Self-Improvement", {color: "green" , nickname : "SI"}]
      ]);

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;


  constructor(private api: APIService) { }

  ngOnInit(): void {
    this.listBooks();

    this.api.OnCreateBookListener.subscribe( (event: any) => {
      const newBook = event.value.data.onCreateBook;
      this.books = [newBook, ...this.books];
      this.books.sort((a, b) => a.queue_pos < b.queue_pos ? -1 : a.queue_pos > b.queue_pos ? 1 : 0)
      this.allBooks = this.books;

    });

    this.api.OnDeleteBookListener.subscribe( (event: any) => {
      this.listBooks();
    });

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
          startWith(''),
          map(value => this._filter(value))
        );

    this.onChanges();

  }

  listBooks(): void{
    this.api.ListBooks().then(event => {
      this.books = event.items;
      this.books.sort((a, b) => a.queue_pos < b.queue_pos ? -1 : a.queue_pos > b.queue_pos ? 1 : 0);
      this.allBooks = this.books;

    });
  }

  onSelect(book: Book): void {
    this.mode = 'details';
    this.selectedBook = book;
  }


  onTag(tag: string): void {
    console.log(tag);

    console.log(this.tagInformation.get(tag));
  }

  addBook(){
    this.mode = 'add';
  }

  deleteBook(book: Book): void {
    // need to check user for deletion
    console.log(book);

    let deletedBook = {
      "id": book.id
   };

    this.api.DeleteBook(deletedBook).then(event => {
      console.log('item deleted!');
      this.mode = 'none';

    })
    .catch(e => {
      console.log('error deleting book...', e);
    });

  }


  public onStatusFilterChange(val){

    let selectedBooks = [];
    if (val !=''){
      for(let filter of val){

        let filteredBooks = this.allBooks.filter(book => book.tags.includes(filter));

        selectedBooks = selectedBooks.concat(filteredBooks);

      }
    }else{
      selectedBooks = this.allBooks;
    }
    this.books = selectedBooks;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log(filterValue);
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onChanges(): void {
    this.myControl.valueChanges.subscribe(val => {
      let selectedBooks = [];
      let filteredBooks = [];
      filteredBooks = this.allBooks.filter(book => book.title.toLowerCase().includes(val));
      selectedBooks = selectedBooks.concat(filteredBooks);
      this.books = selectedBooks;
    });
}


}
