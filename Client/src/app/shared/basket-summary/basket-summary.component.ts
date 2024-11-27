import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../Models/basket';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrl: './basket-summary.component.scss'
})
export class BasketSummaryComponent {
  basket$!:Observable<IBasket | null>;
  @Output() increment:EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() decrement:EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() remove:EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Input () isBasket:boolean = false;

  constructor(private basketService:BasketService){
    this.basket$ = basketService.basket$
  }

  decrementItemQuantity(item:IBasketItem){
    this.decrement.emit(item);
  }

  incrementItemQuantity(item:IBasketItem){
    this.increment.emit(item);
  }


  removeItemFromBAsket(item:IBasketItem){
    this.remove.emit(item);
  }


}
