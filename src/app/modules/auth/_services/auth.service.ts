// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
 
const jwtHelper = new JwtHelperService();

@Injectable()
export class AuthService {

  constructor() {}

  // ...
  public isAuthenticated(): boolean {

    const token = localStorage.getItem('phitr_token');
    if(token){
    var dToken = jwtHelper.decodeToken(token);
    console.log(dToken);
    // Check whether the token is expired and return
    // true or false
    return !jwtHelper.isTokenExpired(token);
    }else{return false;}
  }

}