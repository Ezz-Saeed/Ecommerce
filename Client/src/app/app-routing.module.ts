import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFountComponent } from './core/not-fount/not-fount.component';

const routes: Routes = [
  {path:'', component:HomeComponent, data:{breadcrumb:'Home'}},
  {path:'server-error', component:ServerErrorComponent,  data:{breadcrumb:'Sserver Error'}},
  {path:'not-found', component:NotFountComponent,  data:{breadcrumb:'Not Found'}},
  {path:'test-error', component:TestErrorComponent,  data:{breadcrumb:'Test Error'}},
  {path:'shop', loadChildren:()=>import('./shop/shop.module').then(module=>module.ShopModule),
    data:{breadcrumb:'Shop'}
  },
  {path:'basket', loadChildren:()=>import('./basket/basket.module').then(module=>module.BasketModule),
    data:{breadCrumb:'Basket'}
  },
  // {path:'shop/:id', component:ProductDetailsComponent},
  {path:'**', redirectTo:'not-found', pathMatch:'full',  data:{breadcrumb:'Not Found'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
