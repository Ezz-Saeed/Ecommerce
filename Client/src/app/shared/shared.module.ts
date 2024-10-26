import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent } from './pager/pager.component';
import { PagingHeaderComponent } from './paging-header/paging-header.component';



@NgModule({
  declarations: [
    PagerComponent,
    PagingHeaderComponent,
  ],
  imports: [
    CommonModule,

  ],
  exports:[
  PagingHeaderComponent,
  PagerComponent
  ]
})
export class SharedModule { }
