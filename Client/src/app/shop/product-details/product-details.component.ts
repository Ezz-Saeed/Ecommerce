import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { IProduct } from '../../shared/Models/product';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  product!:IProduct;
  productId!:number;
  quantity:number=1;
  constructor
  (private shopService:ShopService, private activatedRoute:ActivatedRoute,
   private breadCrumbService:BreadcrumbService,
  private basketService:BasketService){
    this.breadCrumbService.set('@productDetails',"  ");
  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap=>{
      this.productId = Number(paramMap.get('id'));
    })
    this.loadProduct(this.productId);
  }

  addItemToBasket(){
    this.basketService.addItemToBasket(this.product,this.quantity);
  }

  incrementItemQuantity(){
    this.quantity++;
  }

  decrementItemQuantity(){
    if(this.quantity > 1){
      this.quantity--;
    }
  }

  loadProduct(id:number){
    this.shopService.getProduct(id).subscribe({
      next: p=>{
        this.product = p
        this.breadCrumbService.set('@productDetails',p.name);
      },
      error: e=>{
        console.log(e)
      }
    })
  }

}
