import { Component, OnInit, Input } from '@angular/core';
import { APIService } from 'src/app/API.service';
import { Book, CurrentBook } from 'src/types/book';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent implements OnInit {

  @Input('book')  book: Book;


  constructor(private api: APIService) { }

  ngOnInit(): void {
  }

  delete(): void {
    console.log(this.book);

    let deletedBook = {
      "id": this.book.id
   };

    this.api.DeleteBook(deletedBook).then(event => {
      console.log('item deleted!');
    })
    .catch(e => {
      console.log('error deleting book...', e);
    });
  }
  cancel():void{}


}
