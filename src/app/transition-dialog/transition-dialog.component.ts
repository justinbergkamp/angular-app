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
  newStatus: number;
  @ViewChild(BookDetailComponent) bookDetails: BookDetailComponent;


  constructor(
    public dialogRef: MatDialogRef<TransitionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.book = data.book;
      this.newStatus = data.status;
    }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onUpdate(): void {
    // TODO: could handle error raised by book-detail 
    this.onCancel();
  }

}
