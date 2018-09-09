import { Route } from '@angular/router';
import { AuthGuardService as AuthGuard } from './modules/auth/_services/auth-guard.service';


export const routes: Route[] = [
  { loadChildren: 'app/dashboard/dashboard.module#DashboardModule',canActivate: [AuthGuard] , path: 'dashboard' },
  { loadChildren: 'app/profile/profile.module#ProfileModule', path: 'profile',canActivate: [AuthGuard] },
  { loadChildren: 'app/modules/home/home.module#HomeModule', path: 'home'},
  { loadChildren: 'app/modules/auth/auth.module#AuthModule', path: 'auth' }, 
  { path:'', pathMatch:'full',redirectTo:'home'},
  { path: '**', redirectTo: 'not-found' }
];
