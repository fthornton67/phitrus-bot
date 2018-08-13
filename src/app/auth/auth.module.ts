import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendeeModule } from '../modules/attendee/attendee.module';
import { DashboardComponent } from './dashboard.component';
import { routes } from './auth.router';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  imports: [
    CommonModule,    
    RouterModule.forChild(routes)
  ],
  declarations: [AuthComponent],
  bootstrap: [
    AuthComponent
  ]
})
export class AuthModule { }
