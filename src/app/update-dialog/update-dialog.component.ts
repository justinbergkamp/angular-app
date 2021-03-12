import { Component, Inject, Optional, OnInit, EventEmitter, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Book, CurrentBook } from 'src/types/book';


import { AddBookComponent } from 'src/app/_book-components/add-book/add-book.component';
import { DeleteBookComponent } from 'src/app/_book-components/delete-book/delete-book.component';
import { EditBookComponent } from 'src/app/_book-components/edit-book/edit-book.component';

import { APIService } from 'src/app/API.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {

  book: Book;
  onAdd = new EventEmitter();

  // TODO: Can either use the event emitter method or listen for an update like we do below  
  @ViewChild(EditBookComponent) editBook: EditBookComponent;


  //for the moment will handle add and delete actions
  action: string;

  constructor(
      private api: APIService,
      public dialogRef: MatDialogRef<UpdateDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any)
      {
        this.book = data.book;
        this.action = data.action;
      }

  ngOnInit(): void {
    this.api.OnCreateBookListener.subscribe( (event: any) => {
      console.log("Created Book");
      this.closeDialog()
    });

    this.api.OnDeleteBookListener.subscribe( (event: any) => {
      console.log("Deleted Book");
      this.closeDialog()
    });

  }

  closeDialog(){
    this.dialogRef.close();
  }

}
