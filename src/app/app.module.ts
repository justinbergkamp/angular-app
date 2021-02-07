import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {ScrollingModule} from '@angular/cdk/scrolling';


import {DragDropModule} from '@angular/cdk/drag-drop';


import { LibraryComponent } from './library/library.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AddBookComponent } from './add-book/add-book.component';
import { QueueComponent } from './queue/queue.component';
import { CurrentBookComponent } from './current-book/current-book.component';
import { SessionDialogComponent } from './session-dialog/session-dialog.component';
import { TransitionDialogComponent } from './transition-dialog/transition-dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BookDetailComponent,
    AddBookComponent,
    LibraryComponent,
    QueueComponent,
    CurrentBookComponent,
    SessionDialogComponent,
    TransitionDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyUIAngularModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DragDropModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatDialogModule,
    ScrollingModule,
    MatCarouselModule.forRoot()

  ],
  entryComponents: [
    SessionDialogComponent,
    TransitionDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
