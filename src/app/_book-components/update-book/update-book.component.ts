import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Book } from 'src/types/book';
import { FormService } from 'src/app/_services/form.service';
import { TransitionService } from 'src/app/_services/transition.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {

  @Input() book: Book;
  @Input() newStatus: number;
  @Output() onUpdate = new EventEmitter();

  public updateForm: FormGroup;



  constructor(private formService : FormService, private transitionService : TransitionService ) { }

  ngOnInit(): void {
    this.updateForm = this.formService.composePartialForm(""+this.newStatus);
    //should partially patch form depending on the new status
  }

  changeStarRating(rating){
    this.book.rating = rating;
  }


  updateBook(){
    this.book.status = this.newStatus;
    try {
      this.transitionService.updateBook(this.book, this.book.id, this.book.status);
    } catch (error) {
      console.log('error updating book...', error);
    }
  }

}
