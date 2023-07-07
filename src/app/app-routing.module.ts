import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './login-form/login-form.component';
<<<<<<< HEAD
import {HistoryComponent} from "./history/history.component";
=======
import { AppComponent } from './app.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
>>>>>>> 72bd0a75ea9f5298658851e9d4a541d52df5f4e5

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginFormComponent},
<<<<<<< HEAD
  {path: 'history', component: HistoryComponent},
  {path: '', component: LoginFormComponent}
=======
  {path: '', component: LoginFormComponent},
  {path: 'registration', component: RegistrationFormComponent}
>>>>>>> 72bd0a75ea9f5298658851e9d4a541d52df5f4e5
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
