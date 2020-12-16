import { Book } from '../../types/book';
import { Component, OnInit, Input } from '@angular/core';
import { APIService } from '../API.service';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {


  @Input() book: Book;


  constructor(private api: APIService) { }

  ngOnInit(): void {
  }

  updateBook(){
    console.log(this.book);

    let updatedBook = {"id":this.book.id, "title":this.book.title, "description":this.book.description, "author":this.book.author, "status":this.book.status, "queue_pos":this.book.queue_pos};

    this.api.UpdateBook(updatedBook).then(event => {
      console.log('item updated!');
    })
    .catch(e => {
      console.log('error updating book...', e);
    });

  }
}
