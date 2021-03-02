import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../../../../types/book';
import { APIService } from '../../../API.service';

@Component({
  selector: 'app-library-grid-card',
  templateUrl: './library-grid-card.component.html',
  styleUrls: ['./library-grid-card.component.css']
})
export class LibraryGridCardComponent implements OnInit {

  @Input('book')  book: Book;
  @Input('status')  status: number;

  allTags: string[] = ['Science', 'Fantasy', 'History', 'Philosophy', 'Self-Improvement'];
  tagInformation = new Map([
          ["Science",    {color: "blue" , nickname : "S"}],
          ["Fantasy",    {color: "red" , nickname : "F"}],
          ["History",    {color: "pink" , nickname : "H"}],
          ["Philosophy", {color: "purple" , nickname : "P"}],
          ["Self-Improvement", {color: "green" , nickname : "SI"}]
      ]);

  constructor(private api: APIService) { }

  ngOnInit(): void {
  }

  addToQueue(book : Book): void {
    // book.status = 1;
    // this.selectedBook = book;
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

}
