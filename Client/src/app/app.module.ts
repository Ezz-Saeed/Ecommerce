import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeModule } from './home/home.module';
import { provideRouter,  } from '@angular/router';
import { routes } from './shop/shop-routing.module';
import { ErrorInterceptor } from './core/Interceptors/error.interceptor';
import {NgxSpinnerModule} from 'ngx-spinner'
import { LoadingInterceptor } from './core/Interceptors/loading.interceptor';
import { authInterceptor } from './core/Interceptors/auth.interceptor';
// import { StepperComponent } from './stepper/stepper.component';

@NgModule({
  declarations: [
    AppComponent,
    // StepperComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    FontAwesomeModule,
    HomeModule,
    NgxSpinnerModule

  ],
  providers:[provideRouter(routes), {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS, useClass:LoadingInterceptor, multi:true},
    provideHttpClient(withFetch(),withInterceptors([authInterceptor]))
  ]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
