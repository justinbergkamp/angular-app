import { Component, Inject, Optional, OnInit, EventEmitter, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Book, CurrentBook } from '../../types/book';
import { BookDetailComponent } from '../book-detail/book-detail.component';

@Component({
  selector: 'app-transition-dialog',
  templateUrl: './transition-dialog.component.html',
  styleUrls: ['./transition-dialog.component.css']
})
export class TransitionDialogComponent  {

  book: Book;
  @ViewChild(BookDetailComponent) bookDetails: BookDetailComponent;


  constructor(
    public dialogRef: MatDialogRef<TransitionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book){
      this.book = data;
      console.log(this.book);
    }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onUpdate(): void {
    console.log("You betcha");
    this.onCancel();
  }

}