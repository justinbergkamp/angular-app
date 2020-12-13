import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { APIService } from './API.service';
import { Book } from '../types/book';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'amplify-angular-app';
  public createForm: FormGroup;

  books: Array<Book>;
  myFlagForButtonToggle: String = "Single";
  endpointToggleOptions: Array<String> = ["Single", "Multiple"];

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
      });

      /* subscribe to new restaurants being created */
      this.api.OnCreateBookListener.subscribe( (event: any) => {
          const newBook = event.value.data.onCreateBook;
            this.books = [newBook, ...this.books];
          });
    }



 public onEndpointValChange(val){
   console.log(val)
 }


  public onCreate(book: Book) {
    console.log(book)
    const book2 = {title: book.title, description: book.description, author: book.author, status: book.status, queue_pos: 1 }
    this.api.CreateBook(book2).then(event => {
      console.log('item created!');
      this.createForm.reset();
    })
    .catch(e => {
      console.log('error creating restaurant...', e);
    });
  }
}
