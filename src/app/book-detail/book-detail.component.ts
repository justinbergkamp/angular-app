import { Book } from '../../types/book';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { APIService } from '../API.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SimpleChanges } from '@angular/core';


import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})

export class BookDetailComponent implements OnInit {


  @Input() book: Book;
  statusOptions: Array<String> = ["Backlog" , "Ready",  "Current", "Done"];
  public updateForm: FormGroup;


 // information needed for the tags
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredTags: Observable<string[]>;
  currentTags: string[] = [];
  allTags: string[] = ['Science', 'Fantasy', 'History', 'Philosophy', 'Self-Improvement'];

  currentStatus: String = "Backlog";


  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;


  constructor(private api: APIService, private fb: FormBuilder) {

    this.updateForm = this.fb.group({
      'title': ['', Validators.required],
      'author': ['', Validators.required],
      'description': [''],
      'pageNumber': [''],
      'tags': [''],
      'status': ['', Validators.required],
      'startDate': [''],
      'finishDate': ['']
    });

    this.filteredTags = this.updateForm.controls.tags.valueChanges.pipe(
            startWith(null),
            map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));

  }

  ngOnInit(): void {  }

  ngOnChanges(changes: SimpleChanges) {

    this.updateForm.patchValue({title: this.book.title, author: this.book.author, status: this.book.status,
    description: this.book.description, pageNumber: this.book.pageNumber,tags: this.book.tags,
    startDate: this.book.startDate, finishDate: this.book.finishDate});
    this.currentTags = this.book.tags;
    if (this.currentTags == null) {
      this.currentTags = [];
    }

    this.currentStatus = this.statusOptions[this.book.status];


}


  updateBook(book: Book){

    let updatedBook = {
      "id": this.book.id,
      "title": book.title,
      "author": book.author,
      "status": book.status,
      "description": book.description,
      "pageNumber": book.pageNumber,
      "queue_pos": this.book.queue_pos,
      "tags": this.currentTags,
      "startDate": book.startDate,
      "finishDate": book.finishDate
   };
   console.log(updatedBook);

    this.api.UpdateBook(updatedBook).then(event => {
      console.log('item updated!');
    })
    .catch(e => {
      console.log('error updating book...', e);
    });

  }

  public onStatusUpdate(val){
    this.book.status = val;
    console.log(this.book.status);

  }

  //tag methods

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.currentTags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.updateForm.controls.tags.setValue(null);
  }

  remove(tag: string): void {
    const index = this.currentTags.indexOf(tag);

    if (index >= 0) {
      this.currentTags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.currentTags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.updateForm.controls.tags.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toString().toLowerCase();
    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
}
