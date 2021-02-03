import { Component, Inject, Optional, OnInit, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface SessionData {
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

  onAdd = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<SessionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SessionData)
    {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.onAdd.emit(this.data);
  }

}
