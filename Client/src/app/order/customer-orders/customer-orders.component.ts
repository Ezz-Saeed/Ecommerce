import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order-service.service';
import { IOrder } from '../../shared/Models/order';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.scss'
})
export class CustomerOrdersComponent implements OnInit {

  orders!:IOrder[]
  constructor(private orderService:OrderService){}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(){
    this.orderService.getOrders().subscribe({
      next:res=>{
        this.orders = res
        // console.log(res)
      },
      error:err=>console.log(err)
    })
  }
}
