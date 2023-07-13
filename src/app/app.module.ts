import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import {TabsModule} from "ngx-bootstrap/tabs";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { FilterPipe } from './filter.pipe';
import { ModalComponent } from './modal/modal.component';
import { NotificationModalComponent } from './notification-modal/notification-modal.component';
import {JwtModule} from "@auth0/angular-jwt";



export function tokenGetter() {
  return localStorage.getItem('access_token'); // Adjust this to retrieve the token from the desired source
}



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginFormComponent,
    HomeComponent,
    HistoryComponent,
    RegistrationFormComponent,
    FilterPipe,
    ModalComponent,
    NotificationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TabsModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['example.com'], // Adjust this to match your domain
        disallowedRoutes: ['example.com/auth/'], // Adjust this to match your authentication routes
      },
    }),

  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [FormsModule, ReactiveFormsModule ]
})
export class AppModule { }
