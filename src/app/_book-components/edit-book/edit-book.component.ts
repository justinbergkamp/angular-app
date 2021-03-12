import { Component, OnInit, Input, Output, SimpleChanges } from '@angular/core';
import { Book } from 'src/types/book';
import { TransitionService } from 'src/app/_services/transition.service';
import { FormService } from 'src/app/_services/form.service';
import { FormGroup } from '@angular/forms';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  @Input() book: Book;
  @Output() onUpdate = new EventEmitter();

  public editForm: FormGroup;

  // TODO: Move the status options to an enum in the types
  statusOptions: Array<String> = ["Backlog" , "Ready",  "Current", "Done"];


  //Info needed for tags
  // TODO: Move to tag component
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredTags: Observable<string[]>;
  currentTags: string[] = [];
  allTags: string[] = ['Science', 'Fantasy', 'History', 'Philosophy', 'Self-Improvement'];

  //Used for tag input
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;


  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.updateForm = this.formService.composeForm(""+this.book.status);

    this.filteredTags = this.updateForm.controls.tags.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));

    this.patchFormValues();

    this.currentTags = this.book.tags;
    if (this.currentTags == null) {
      this.currentTags = [];
    }

    this.currentStatus = this.statusOptions[this.book.status];


  }

  patchFormValues():{
    // TODO: I think this can be cleaned with either NgModel or Dynamic Forms
    this.updateForm.patchValue({
      title: this.book.title,
      author: this.book.author,
      status: this.book.status,
      description: this.book.description,
      pages: this.book.pages,
      tags: this.book.tags,
      startDate: this.book.startDate,
      goalFinishDate: this.book.goalFinishDate,
      finishDate: this.book.finishDate});

  }

  updateBook(book: Book){
    try {
      this.transitionService.updateBook(book, this.book.id, this.book.status);
    } catch (error) {
      console.log('error updating book...', error);
    }
  }

  //Tag toggle buttons
  public onStatusUpdate(val){
    this.book.status = val;
  }

  //tag methods

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
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
