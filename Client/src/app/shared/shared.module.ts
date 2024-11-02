import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PagerComponent } from './pager/pager.component';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { OrderTotalsComponent } from './order-totals/order-totals.component';



@NgModule({
  declarations: [
    PagerComponent,
    PagingHeaderComponent,
    OrderTotalsComponent,

  ],
  imports: [
    CommonModule,


  ],
  exports:[
    PagingHeaderComponent,
    PagerComponent,
    OrderTotalsComponent,

  ]
})
export class SharedModule { }
