import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LibraryComponent} from './library/library.component';
import {CurrentBookComponent} from './current-book/current-book.component';
import {AddBookComponent} from './add-book/add-book.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'current-book', component: CurrentBookComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
