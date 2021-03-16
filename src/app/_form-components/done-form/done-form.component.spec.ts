import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneFormComponent } from './done-form.component';

describe('DoneFormComponent', () => {
  let component: DoneFormComponent;
  let fixture: ComponentFixture<DoneFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoneFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoneFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
