import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order-service.service';
import { IOrder } from '../../shared/Models/order';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-customer-last-order',
  templateUrl: './customer-last-order.component.html',
  styleUrl: './customer-last-order.component.scss'
})
export class CustomerLastOrderComponent implements OnInit {
  order!:IOrder;
  orderId!:number;
  constructor(private orderService:OrderService, private activatedRoute :ActivatedRoute,
    private  breadcrumbService:BreadcrumbService){
      breadcrumbService.set('@lastOrder',' ');
    }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap=>{
      this.orderId = Number(paramMap.get('id'));
    });
    this.loadOrder(this.orderId);
  }

  loadOrder(id:number){
    this.orderService.getOrderById(id).subscribe({
      next:res=>{
        this.order = res;
        this.breadcrumbService.set('@lastOrder', `Order# ${res.id} - ${res.status}`)
      },
      error:err=>console.log(err)
    })
  }

}
