import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { APIService } from '../API.service';
import { Book } from '../../types/book';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  books: Array<Book>;
  allBooks: Array<Book>;
  selectedBook: Book;


  constructor(private api: APIService, private fb: FormBuilder) { }

  @Output() onSelectValue = new EventEmitter<{selectedBook: Book}>();


  ngOnInit(): void {

    this.api.ListBooks().then(event => {
      this.books = event.items;
      this.books.sort((a, b) => a.queue_pos < b.queue_pos ? -1 : a.queue_pos > b.queue_pos ? 1 : 0);
      this.allBooks = this.books;

    });
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
    // this.mode = 'details';
    this.selectedBook = book;
    this.onSelectValue.emit( {selectedBook: this.selectedBook} );

  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(this.books)
    moveItemInArray(this.books, event.previousIndex, event.currentIndex);
    console.log(this.books)
    this.updateOrder();
  }


}
