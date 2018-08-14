// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { JwtHelper } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  constructor(public jwtHelper: JwtHelper) {}

  // ...
  public isAuthenticated(): boolean {

    const token = localStorage.getItem('token');

    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

}