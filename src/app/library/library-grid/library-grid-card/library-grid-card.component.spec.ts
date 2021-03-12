import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryGridCardComponent } from './library-grid-card.component';

describe('LibraryGridCardComponent', () => {
  let component: LibraryGridCardComponent;
  let fixture: ComponentFixture<LibraryGridCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryGridCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryGridCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
