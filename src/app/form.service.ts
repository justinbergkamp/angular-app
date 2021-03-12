import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor( private fb: FormBuilder) { }

  composeForm(status: string):FormGroup{
    let updateForm = this.composeCurrentForm();
    return updateForm;
  }

  composeCurrentForm(){
    let updateForm = this.fb.group({
      'title': ['', Validators.required],
      'author': ['', Validators.required],
      'description': ['', Validators.required],
      'pages': ['', Validators.required],
      'pageNumber': [''],
      'tags': [''],
      'status': [''],
      'startDate': ['', Validators.required],
      'goalFinishDate': ['', Validators.required],
    });
    return updateForm
  }
}
