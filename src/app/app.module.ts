import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { OrganizationComponent } from './organization/organization.component';
import { HttpClientModule } from '@angular/common/http';
import { OrganizationRegisterComponent } from './organization-register/organization-register.component';
import { AddNewuserComponent } from './add-newuser/add-newuser.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule } from 'ngx-ui-loader';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    StudentRegisterComponent,
    OrganizationComponent,
    OrganizationRegisterComponent,
    AddNewuserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    MatMenuModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxUiLoaderModule.forRoot({
      bgsColor: 'blue',
      bgsOpacity: 0.5,
      bgsPosition: 'bottom-right',
      bgsSize: 40,
      bgsType: 'ball-spin-clockwise', 
      fgsType: 'rectangle-bounce', 
      overlayColor: 'rgba(40,40,40,0.8)',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
