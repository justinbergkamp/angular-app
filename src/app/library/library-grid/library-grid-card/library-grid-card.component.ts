import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../../../../types/book';
import { APIService } from '../../../API.service';
import { UpdateDialogComponent } from '../../../update-dialog/update-dialog.component';

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
          ["Science",    {color: "#2fa4d6" , nickname : "S"}],
          ["Fantasy",    {color: "#d16d6d" , nickname : "F"}],
          ["History",    {color: "#d9d95f" , nickname : "H"}],
          ["Philosophy", {color: "#af79c9" , nickname : "P"}],
          ["Self-Improvement", {color: "#7ccc43" , nickname : "SI"}]
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

  }

  onTag(tag : string):void{

  }

}
