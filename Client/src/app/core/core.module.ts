import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { TestErrorComponent } from './test-error/test-error.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { NotFountComponent } from './not-fount/not-fount.component';
import {ToastrModule} from 'ngx-toastr';
import { SectionHeaderComponent } from './section-header/section-header.component'
import {BreadcrumbComponent} from 'xng-breadcrumb'



@NgModule({
  declarations: [NavBarComponent, TestErrorComponent, ServerErrorComponent, NotFountComponent, SectionHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot({
      positionClass:'toast-bottom-right',
      preventDuplicates:true,
    }),
    BreadcrumbComponent,
  ],
  exports:[
    NavBarComponent,
    SectionHeaderComponent,

  ]
})
export class CoreModule { }
