import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CheckboxRequiredValidator } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';

export const routes:Routes =[
  {path:'',component:CheckoutComponent,data:{breadcrumb:'Checkout'}},
  {path:'success', component:CheckoutSuccessComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports:[
    RouterModule
  ]
})
export class CheckoutRoutingModule { }
