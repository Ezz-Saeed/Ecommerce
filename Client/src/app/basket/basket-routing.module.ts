import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';

export const routes:Routes=[
  {path:'', component:BasketComponent, data:{breadcrumb:'Basket'}}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports:[
    RouterModule
  ]
})
export class BasketRoutingModule { }
