import { Route } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';

export const routes: Route[] = [
  {
    path: '',
    component: AuthComponent
  }
];
