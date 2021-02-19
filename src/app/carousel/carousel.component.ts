import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { trigger, transition, style, animate, useAnimation } from '@angular/animations';
import { SimpleChanges } from '@angular/core';

import {
  enter,
  leave,
  fadeIn,
  fadeOut
} from "./carousel.animations";


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger("carouselAnimation", [
      transition("void => *", [useAnimation(fadeIn, {params: { time: '500ms' }} )]),
      transition("* => void", [useAnimation(fadeOut, {params: { time: '0ms' }})]),
    ])
  ]
})
export class CarouselComponent {
  // coverImage = 'assets/a-promised-land-image.jpg';

  @Input() books;
  @Output() onSlideChange = new EventEmitter<number>();
  @Output() onSession = new EventEmitter();

  completed : boolean = false;
  value: number = 0;

  currentSlide = 0;

  coverImage = 'assets/menu_book.svg';
  color="primary";
  mode="determinate";

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.calculatePercentage(this.books[this.currentSlide]);
    this.checkCompletion();
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.books.length - 1 : previous;
    console.log("previous clicked, new current slide is: ", this.currentSlide);
    this.onSlideChange.emit(this.currentSlide);

    this.resetValues();
    this.calculatePercentage(this.books[this.currentSlide]);
    this.checkCompletion();


  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.books.length ? 0 : next;
    console.log("next clicked, new current slide is: ", this.currentSlide);
    this.onSlideChange.emit(this.currentSlide);

    this.resetValues();
    this.calculatePercentage(this.books[this.currentSlide]);
    this.checkCompletion();

  }

  calculatePercentage(book:any): void {

    let currentPage = book.pageNumber;
    let totalPages  = book.pages;


    if(currentPage === undefined){  currentPage = 0;  }
    if(totalPages === undefined){ totalPages = 0;}
    if(currentPage >= totalPages){  currentPage = totalPages;}

    this.value = Math.floor((currentPage / totalPages)*100);

  }
  checkCompletion(){
    if(this.value == 100){
      this.completed = true;
      this.color = 'primary'
      this.mode="determinate";

    }
  }

  resetValues(){
    this.value = 0;
    this.completed = false;
    this.color="primary";
    this.mode="determinate";
  }

  openDialog(){
    this.onSession.emit();
  }

}
