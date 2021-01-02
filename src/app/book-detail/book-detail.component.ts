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

  currentStatus = '';


  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  // filteredTags: Observable<string[]>;
  filteredTags: string[];
  currentTags: string[] = [];
  allTags: string[] = ['Science', 'Fantasy', 'History', 'Philosophy', 'Self-Improvement'];


  tagSearch = "";

  endpointToggleOptions: Array<String> = ["Backlog", "Groomed", "Current", "Done"];


  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;


  constructor(private api: APIService) {

  }

  modelChangeFn(value) {
    console.log(value);
    this.filteredTags = value.pipe(
            startWith(null),
            map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));

  }

  ngOnInit(): void {
    console.log(this.book.status);
    this.currentStatus = this.book.status;

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

  public onEndpointValChange(val){
    this.book.status = val;
  }

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

    this.tagSearch = "";
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
  // this.createForm.controls.tags.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

}
