import { Route } from '@angular/router';
import { AuthGuardService as AuthGuard } from './_services/auth-guard.service';


export const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'auth', canActivate: [AuthGuard] },
  { loadChildren: 'app/auth/auth.module#AuthModule', path: 'auth' },
  { loadChildren: 'app/dashboard/dashboard.module#DashboardModule',canActivate: [AuthGuard] , path: 'dashboard' },
  { loadChildren: 'app/profile/profile.module#ProfileModule', path: 'profile' },
  { path: '**', redirectTo: 'auth' }
];
