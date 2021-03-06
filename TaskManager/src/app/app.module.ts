import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';

import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { JwtUnuthorizedInterceptorService } from './jwt-unuthorized-interceptor.service';
import { JwtModule } from '@auth0/angular-jwt';


@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,AdminModule,FormsModule,
  JwtModule.forRoot({
    config:{
      tokenGetter:()=>{
        return (sessionStorage.getItem("currentUser")?JSON.parse(sessionStorage.getItem("currentUser") as any).token :null)
      }
    }
  })
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:JwtInterceptorService,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:JwtUnuthorizedInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
