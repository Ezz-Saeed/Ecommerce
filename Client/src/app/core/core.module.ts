import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { TestErrorComponent } from './test-error/test-error.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { NotFountComponent } from './not-fount/not-fount.component';



@NgModule({
  declarations: [NavBarComponent, TestErrorComponent, ServerErrorComponent, NotFountComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[NavBarComponent]
})
export class CoreModule { }
