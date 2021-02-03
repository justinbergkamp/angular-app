import { Component, Inject, Optional, OnInit, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  date: string;
  startPage: string;
  endPage: string;

}

@Component({
  selector: 'app-session-dialog',
  templateUrl: './session-dialog.component.html',
  styleUrls: ['./session-dialog.component.css']
})
export class SessionDialogComponent {

  // public sessionForm: FormGroup;
  onAdd = new EventEmitter();
  // @Output() newItemEvent = new EventEmitter<any>();



  constructor(
    public dialogRef: MatDialogRef<SessionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData)
    {
      // this.sessionForm = this.fb.group({
      //   'date': [''],
      //   'startPage': [''],
      //   'endPage': ['']
      // });

    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log("Submit");
    this.onAdd.emit(this.data);
    this.dialogRef.close();
  }

}
