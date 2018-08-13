import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { IAppState } from '../store';
import { USER_GET } from '../store/profile/profile.actions';
import { ISimpleResponse } from '../shared/interfaces/simple.interface';

export const routes: Route[] = [
  {
    path: '',
    component: DashboardComponent
  }
];
