import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { APIService } from '../API.service';
import { Book } from '../../types/book';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  books: Array<Book>;


  constructor(private api: APIService, private fb: FormBuilder) { }

  public createForm: FormGroup;
  myFlagForButtonToggle: String = "Single";
  endpointToggleOptions: Array<String> = ["To-Read", "Read"];

  ngOnInit(): void {
    this.createForm = this.fb.group({
      'title': ['', Validators.required],
      'description': ['', Validators.required],
      'author': ['', Validators.required],
      'status': ['', Validators.required]

    });

    this.api.ListBooks().then(event => {
      this.books = event.items;
    });

    this.api.OnCreateBookListener.subscribe( (event: any) => {
      const newBook = event.value.data.onCreateBook;
      this.books = [newBook, ...this.books];
      this.books.sort((a, b) => a.queue_pos < b.queue_pos ? -1 : a.queue_pos > b.queue_pos ? 1 : 0)

    });
  }
  public onEndpointValChange(val){
    console.log(val);
  }


  public onCreate(book: Book) {

    book.queue_pos = this.books.length+1;
    this.api.CreateBook(book).then(event => {
      console.log('item created!');
      this.createForm.reset();
    })
    .catch(e => {
      console.log('error creating restaurant...', e);
    });
  }

}
