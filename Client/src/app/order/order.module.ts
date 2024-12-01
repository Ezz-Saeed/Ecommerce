import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { CustomerLastOrderComponent } from './customer-last-order/customer-last-order.component';
import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CustomerOrdersComponent,
    CustomerLastOrderComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule
  ]
})
export class OrderModule { }
