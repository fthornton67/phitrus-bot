import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendeeModule } from '../attendee/attendee.module';
import { routes } from './auth.router';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { AppLinkComponent } from './app-link/app-link.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './_services/auth-guard.service';
import { AuthService } from './_services/auth.service';
import { AppLinkComponent } from './app-link/app-link.component';


@NgModule({
  imports: [
    CommonModule,    
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AppLinkComponent,AuthComponent, LoginComponent, RegisterComponent],
  bootstrap: [
    AuthComponent
  ],
  providers: [AuthGuardService,AuthService]
})
export class AuthModule { }
