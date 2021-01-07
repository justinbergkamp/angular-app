import { Book } from '../../types/book';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { APIService } from '../API.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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
  statusOptions: Array<String> = ["Backlog", "Groomed", "Queued",  "Current", "Done"];
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
    //
    // this.updateForm = this.fb.group({
    //   'title': ['', Validators.required],
    //   'description': ['', Validators.required],
    //   'author': ['', Validators.required],
    //   'tags': [''],
    //   'status': ['', Validators.required]
    //
    // });

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

            console.log("AHHHH");


  }

  ngOnInit(): void {

    this.updateForm.patchValue({title: this.book.title, author: this.book.author, status: this.book.status});
    this.currentTags = this.book.tags;
    this.currentStatus = this.statusOptions[this.book.status];
    console.log("AHHHH");
    console.log(this.currentStatus);

  }

  ngOnChanges(changes: SimpleChanges) {

    console.log("AsasaHHHH");
    // You can also use categoryId.previousValue and
    // categoryId.firstChange for comparing old and new values

}


  updateBook(book: Book){
    console.log("JUSTIN")
    console.log(this.book);
    console.log(book);
    let updatedBook = {"id":this.book.id, "title":this.book.title, "description":this.book.description, "author":this.book.author, "status":this.book.status, "queue_pos":this.book.queue_pos, "tags":[]};

    this.api.UpdateBook(updatedBook).then(event => {
      console.log('item updated!');
    })
    .catch(e => {
      console.log('error updating book...', e);
    });

  }

  public onStatusUpdate(val){
    console.log(val);
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

  remove(fruit: string): void {
    const index = this.currentTags.indexOf(fruit);

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
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
}
