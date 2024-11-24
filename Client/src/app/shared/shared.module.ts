import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PagerComponent } from './pager/pager.component';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { OrderTotalsComponent } from './order-totals/order-totals.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StepperComponent } from './stepper/stepper.component'
import { CdkStepperModule } from '@angular/cdk/stepper';
import { InputTextComponent } from './input-text/input-text.component';
import { BasketSummaryComponent } from './basket-summary/basket-summary.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PagerComponent,
    PagingHeaderComponent,
    OrderTotalsComponent,
    StepperComponent,
    InputTextComponent,
    BasketSummaryComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CdkStepperModule,
    RouterModule
  ],
  exports:[
    PagingHeaderComponent,
    PagerComponent,
    OrderTotalsComponent,
    ReactiveFormsModule,
    CdkStepperModule,
    StepperComponent,
    InputTextComponent,
    BasketSummaryComponent,
  ]
})
export class SharedModule { }
