import { Book } from '../../types/book';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { APIService } from '../API.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})




export class BookDetailComponent implements OnInit {


  @Input() book: Book;


  statusOptions: Array<String> = ["Backlog", "Groomed", "Queued",  "Current", "Done"];


  constructor(private api: APIService) {

  }

  ngOnInit(): void {

  }

  updateBook(book: Book){
    console.log(this.book);
    let updatedBook = {"id":this.book.id, "title":this.book.title, "description":this.book.description, "author":this.book.author, "status":this.book.status, "queue_pos":this.book.queue_pos, "tags":[]};

    this.api.UpdateBook(updatedBook).then(event => {
      console.log('item updated!');
    })
    .catch(e => {
      console.log('error updating book...', e);
    });

  }

  public onStatusUpdate(val){

    this.book.status = this.statusOptions.indexOf(val);
;
    console.log(this.book.status );

  }
}
