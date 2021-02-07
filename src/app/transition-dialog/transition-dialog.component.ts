import { Component, Inject, Optional, OnInit, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Book, CurrentBook } from '../../types/book';

@Component({
  selector: 'app-transition-dialog',
  templateUrl: './transition-dialog.component.html',
  styleUrls: ['./transition-dialog.component.css']
})
export class TransitionDialogComponent  {

  book: Book;

  constructor(
    public dialogRef: MatDialogRef<TransitionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book)
    {
      this.book = data;
      console.log(this.book);
      
    }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    // this.onAdd.emit(this.data);
  }

}
