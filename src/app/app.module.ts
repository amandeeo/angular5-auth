import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';

import { AuthenticationService } from './authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import * as CryptoJS from 'crypto-js';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [AuthenticationService,AuthGuard,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
