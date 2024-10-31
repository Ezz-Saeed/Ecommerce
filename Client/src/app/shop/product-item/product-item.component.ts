import { Component, Input } from '@angular/core';
import { IProduct } from '../../shared/Models/product';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {

  @Input() product!:IProduct;

  constructor(private basketService: BasketService){}

  addItemToBasket(){
    this.basketService.addItemToBasket(this.product, 1);
  }
}
