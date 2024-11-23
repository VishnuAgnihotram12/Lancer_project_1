import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { OrganizationComponent } from './organization/organization.component';
import { OrganizationRegisterComponent } from './organization-register/organization-register.component';
import { AddNewuserComponent } from './add-newuser/add-newuser.component';

const routes: Routes = [
  {path : '',redirectTo: 'Login' , pathMatch : 'full'},
  {path : 'Login', component : LoginComponent},
  {path : 'Signup', component : SignupComponent},
  {path : 'Student-register', component : StudentRegisterComponent},
  {path : 'Organization', component : OrganizationComponent},
  {path : 'Organization-register', component : OrganizationRegisterComponent},
  {path : 'Add-user', component : AddNewuserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
