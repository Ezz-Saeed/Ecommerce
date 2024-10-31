import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { Observable } from 'rxjs';
import { Basket, IBasket } from '../../shared/Models/basket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {

  basket$!:Observable<IBasket | null>
  constructor(private basketService:BasketService){}
  ngOnInit(): void {
    this.basket$ = this.basketService.basket$
  }
}
