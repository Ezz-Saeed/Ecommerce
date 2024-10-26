import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ShopComponent } from './shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'shop', component:ShopComponent},
  {path:'shop/:id', component:ProductDetailsComponent},
  {path:'**', redirectTo:'', pathMatch:'full'},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
})
export class ShopRoutingModule { }
