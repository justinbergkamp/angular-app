import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private api: APIService, private fb: FormBuilder) { }

  async ngOnInit() {
    this.createForm = this.fb.group({
      'name': ['', Validators.required],
      'description': ['', Validators.required],
      'city': ['', Validators.required]
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






  public onCreate(book: Book) {
    this.api.CreateBook(book).then(event => {
      console.log('item created!');
      this.createForm.reset();
    })
    .catch(e => {
      console.log('error creating restaurant...', e);
    });
  }
}
