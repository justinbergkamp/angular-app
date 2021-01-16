import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { APIService } from '../API.service';
import { Book } from '../../types/book';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public createForm: FormGroup;
  mode = '';

  books: Array<Book>;
  allBooks: Array<Book>;
  myFlagForButtonToggle: Array<String> = [];
  endpointToggleOptions: Array<String> = ["To-Read", "Read"];

  selectedBook: Book;


  constructor(private api: APIService, private fb: FormBuilder) { }

  async ngOnInit() {
    this.createForm = this.fb.group({
      'title': ['', Validators.required],
      'description': ['', Validators.required],
      'author': ['', Validators.required],
      'status': ['', Validators.required]

    });

    this.api.ListBooks().then(event => {
      this.books = event.items;
      this.books.sort((a, b) => a.queue_pos < b.queue_pos ? -1 : a.queue_pos > b.queue_pos ? 1 : 0);
      this.allBooks = this.books;

    });

    /* subscribe to new restaurants being updated */
    this.api.OnUpdateBookListener.subscribe( (event: any) => {
      this.api.ListBooks().then(event => {
        this.books = event.items;
        this.books.sort((a, b) => a.queue_pos < b.queue_pos ? -1 : a.queue_pos > b.queue_pos ? 1 : 0);
        this.allBooks = this.books;

      });

    });


    /* subscribe to new restaurants being created */
    this.api.OnCreateBookListener.subscribe( (event: any) => {
      const newBook = event.value.data.onCreateBook;
      this.books = [newBook, ...this.books];
      this.books.sort((a, b) => a.queue_pos < b.queue_pos ? -1 : a.queue_pos > b.queue_pos ? 1 : 0)
      this.allBooks = this.books;

    });

  }
  addBook(){
    this.mode = 'add';
  }

  updateOrder(): void {
    let  ind = 1;
    for (var book of this.books){
      let updatedBook = {"id":book.id, "title":book.title, "description":book.description, "author":book.author, "status":book.status, "queue_pos":ind};
      book.queue_pos = ind;
      this.api.UpdateBook(updatedBook).then(event => {
        console.log('Order Updated');
      })
      .catch(e => {
        console.log('error updating order', e);
      });
      ind++;
    }
  }


  onSelect(book: Book): void {
    this.mode = 'details';
    this.selectedBook = book;
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

  public onCreate(book: Book) {
    console.log(book)
    book.queue_pos = this.books.length+1;
    this.api.CreateBook(book).then(event => {
      console.log('item created!');
      this.createForm.reset();
    })
    .catch(e => {
      console.log('error creating restaurant...', e);
    });
  }

  selectValue( newValue : any ) {
    this.mode = 'details';
    console.log(newValue.selectedBook)
    this.selectedBook = newValue.selectedBook;
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(this.books)
    moveItemInArray(this.books, event.previousIndex, event.currentIndex);
    console.log(this.books)
    this.updateOrder();
  }

}
