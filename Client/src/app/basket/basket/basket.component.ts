import { Component, OnInit } from '@angular/core';
import { Observable, } from 'rxjs';
import { IBasket, IBasketItem } from '../../shared/Models/basket';
import { BasketService } from '../basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit {

  basket$!:Observable<IBasket | null>
  constructor(private basketService:BasketService) {

  }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  removeItemFromBAsket(item: IBasketItem){
    this.basketService.removeItemFromBAsket(item);
  }

  decrementItemQuantity(item:IBasketItem){
    this.basketService.decrementItemQuantity(item);
  }

  incrementItemQuantity(item:IBasketItem){
    this.basketService.incrementItemQuantity(item);
  }

}
