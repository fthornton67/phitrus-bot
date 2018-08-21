import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { IAppState } from '../store';
import { USER_GET } from '../store/profile/profile.actions';
import { ISimpleResponse } from '../shared/interfaces/simple.interface';
import { DeviceGuardService as DeviceGuard } from '../modules/auth/_services/device-guard.service';

export const routes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    canActivateChild: [DeviceGuard],
    children:[
{
    path:'add',
    component: AddDeviceComponent
  }
    ]
  }
  
];
