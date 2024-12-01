import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { CustomerLastOrderComponent } from './customer-last-order/customer-last-order.component';

export const routes:Routes = [
  {path:'', component:CustomerOrdersComponent,data:{breadcrumb:'Orders'}},
  {path:':id',component:CustomerLastOrderComponent,data:{breadcrumb:{alias:'lastOrder'}}}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports:[RouterModule]
})
export class OrderRoutingModule { }
