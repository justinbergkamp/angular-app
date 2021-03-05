import { Component, Inject, Optional, OnInit, EventEmitter, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Book, CurrentBook } from '../../types/book';
import { AddBookComponent } from '../add-book/add-book.component';
import { DeleteBookComponent } from '../delete-book/delete-book.component';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {

  book: Book;
  onAdd = new EventEmitter();


  //for the moment will handle add and delete actions
  action: string;

  constructor(
      public dialogRef: MatDialogRef<UpdateDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any)
      {
        this.book = data.book;
        this.action = data.action;
      }

  ngOnInit(): void {}

  closeDialog(){
    this.dialogRef.close();
  }

}
