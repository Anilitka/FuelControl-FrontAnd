import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [
  {path: 'Home', component: HomeComponent},
  {path: 'Login', component: LoginFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
