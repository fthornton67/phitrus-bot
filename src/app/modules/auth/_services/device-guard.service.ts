// src/app/auth/auth-guard.service.ts

import { Injectable } from '@angular/core';
import { CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class DeviceGuardService implements CanActivateChild {

  constructor(public auth: AuthService, public router: Router) {}

  canActivateChild(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    console.log('device check')
    if (!this.auth.isAuthenticated()) {
      console.log(state.url);
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }


}