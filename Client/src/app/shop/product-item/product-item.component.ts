import { Component, Input } from '@angular/core';
import { IProduct } from '../../shared/Models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {

  @Input() product!:IProduct;
}
