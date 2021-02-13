import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { trigger, transition, style, animate, useAnimation } from '@angular/animations';

import {
  enter,
  leave,
} from "./carousel.animations";


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger("carouselAnimation", [
      transition("void => *", [useAnimation(enter, {params: { time: '500ms' }} )]),
      transition("* => void", [useAnimation(leave, {params: { time: '0ms' }})]),
    ])
  ]
})
export class CarouselComponent implements OnInit {
  // coverImage = 'assets/a-promised-land-image.jpg';

  @Input() books;
  @Output() onSlideChange = new EventEmitter<number>();
  @Output() onSession = new EventEmitter();



  currentSlide = 0;

  coverImage = 'assets/menu_book.svg';
  color="primary";
  mode="determinate";

  constructor() { }

  ngOnInit(): void {
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.books.length - 1 : previous;
    console.log("previous clicked, new current slide is: ", this.currentSlide);
    this.onSlideChange.emit(this.currentSlide);

  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.books.length ? 0 : next;
    console.log("next clicked, new current slide is: ", this.currentSlide);
    this.onSlideChange.emit(this.currentSlide);

  }

  calculatePercentage(currentPage : number , totalPages:number): number {
    // TODO: should be nicer
    if(currentPage === undefined){
      currentPage = 0;
    }
    if(totalPages === undefined){
      totalPages = 0;
    }
    if(currentPage >= totalPages){
      currentPage = totalPages;
    }
    let value = Math.floor((currentPage / totalPages)*100);
    return value;
  }
  
  openDialog(){
    this.onSession.emit();
  }

}
