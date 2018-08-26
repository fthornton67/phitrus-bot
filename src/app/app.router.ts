import { Route } from '@angular/router';
import { AuthGuardService as AuthGuard } from './modules/auth/_services/auth-guard.service';


export const routes: Route[] = [
  { loadChildren: 'app/dashboard/dashboard.module#DashboardModule',canActivate: [AuthGuard] , path: 'dashboard' },
  { loadChildren: 'app/profile/profile.module#ProfileModule', path: 'profile',canActivate: [AuthGuard] },
  { loadChildren: 'app/modules/auth/auth.module#AuthModule', path: 'auth' },
  { loadChildren: 'app/modules/home/home.module#HomeModule', path: 'home'},
  { path: '', pathMatch:'full',redirectTo: 'auth/login' },
  { path: '**', redirectTo: 'auth/login' } // should be 404
];
