import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrl: './pager.component.scss'
})
export class PagerComponent {
  @Input()totalCount!:number;
  @Input()pageNumber:number=1;
  @Input()numberOfPages!:number;
  @Input()pagesArray!:number[];
  @Output()pageChanged= new EventEmitter<number>();
  @Output()previousChanged= new EventEmitter<number>();
  @Output()nextChanged= new EventEmitter<number>();


  onPagerChanges(page:number){
    this.pageNumber = page;
    this.pageChanged.emit(page)
  }

  onPreviousPage(){
    if(this.pageNumber>1){
      this.pageNumber-=1;
      this.previousChanged.emit(this.pageNumber)
    }
  }

  onNextPage(){
    if(this.pageNumber!==this.numberOfPages){
      this.pageNumber+=1;
      this.nextChanged.emit(this.pageNumber)
    }

  }
}
