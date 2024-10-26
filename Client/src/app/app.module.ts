import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { ShopModule } from './shop/shop.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './shop/shop-routing.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    ShopModule,
    FontAwesomeModule,
    HomeModule,
    
  ],
  providers:[provideRouter(routes)]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
