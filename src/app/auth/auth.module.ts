import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendeeModule } from '../modules/attendee/attendee.module';
import { routes } from './auth.router';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,    
    RouterModule.forChild(routes)
  ],
  declarations: [AuthComponent, LoginComponent],
  bootstrap: [
    AuthComponent
  ]
})
export class AuthModule { }
