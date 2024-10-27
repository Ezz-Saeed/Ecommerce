import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { IProduct } from '../../shared/Models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  product!:IProduct;
  productId!:number;
  constructor(private shopService:ShopService, private activatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap=>{
      this.productId = Number(paramMap.get('id'));
    })
    this.loadProduct(this.productId);
  }


  loadProduct(id:number){
    this.shopService.getProduct(id).subscribe({
      next: p=>{
        this.product = p
      },
      error: e=>{
        console.log(e)
      }
    })
  }

}
