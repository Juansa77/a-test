import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { UserlistComponent } from './components/userlist/userlist.component';

import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth-guard.service';



const routes: Routes = [
  { path: 'register', component: RegisterComponent/* */ },
  { path: 'users', component: UserlistComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
