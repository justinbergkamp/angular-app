import { Component, OnInit, Input } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { APIService } from '../../API.service';
import { Book } from '../../../types/book';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-library-grid',
  templateUrl: './library-grid.component.html',
  styleUrls: ['./library-grid.component.css']
})
export class LibraryGridComponent implements OnInit {

  @Input() allBooks :Array<Book>;
  books : Array<Book>;
  selectedBook: Book;




// should pull tag info from json or DB
  allTags: string[] = ['Science', 'Fantasy', 'History', 'Philosophy', 'Self-Improvement'];
  tagInformation = new Map([
          ["Science",    {color: "blue" , nickname : "S"}],
          ["Fantasy",    {color: "red" , nickname : "F"}],
          ["History",    {color: "pink" , nickname : "H"}],
          ["Philosophy", {color: "purple" , nickname : "P"}],
          ["Self-Improvement", {color: "green" , nickname : "SI"}]
      ]);

  tagFilterToggle: Array<String> = [];
  tagOptions: Array<String> = this.allTags;

  search = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor(private api: APIService) { }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.allBooks);

    this.books = this.allBooks;
  }

  ngOnInit(): void {
    // this.books.sort((a, b) => a.queue_pos < b.queue_pos ? -1 : a.queue_pos > b.queue_pos ? 1 : 0);
    this.onChanges();
  }

  public onStatusFilterChange(val){

    let selectedBooks = [];
    if (val !=''){
      for(let filter of val){

        let filteredBooks = this.books.filter(book => book.tags.includes(filter));

        selectedBooks = selectedBooks.concat(filteredBooks);

      }
    }else{
      selectedBooks = this.allBooks;
    }
    this.books = selectedBooks;
  }

  onSelect(book: Book): void {
    this.selectedBook = book;
    //should either emit or move to transition dialog
  }

  onTag(tag: string): void {
    console.log(tag);
    console.log(this.tagInformation.get(tag));
  }


  deleteBook(book: Book): void {
    // need to check user for deletion
    //simple alert until more robust dialog
    console.log(book);

    let deletedBook = {
      "id": book.id
   };

    this.api.DeleteBook(deletedBook).then(event => {
      console.log('item deleted!');
    })
    .catch(e => {
      console.log('error deleting book...', e);
    });
  }


  onChanges(): void {
    console.log("test");

    this.search.valueChanges.subscribe(val => {
      let filteredBooks = [];
      filteredBooks = this.allBooks.filter(book => book.title.toLowerCase().includes(val));
      this.books = filteredBooks;
    });
  }

  addToQueue(book : Book): void {
    book.status = 1;
    this.selectedBook = book;
  }

}
