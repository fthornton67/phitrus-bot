import { Route } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { LoginComponent } from "./login/login.component";
import { AppLinkComponent } from "./app-link/app-link.component";
import { RegisterComponent } from "./register/register.component";
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Store } from "@ngrx/store";
import { AuthGuardService as AuthGuard } from "./_services/auth-guard.service";

export const routes: Route[] = [
  {
    path: "auth",
    component: AuthComponent,
    children: [
      {
        path: "",
        component: AuthComponent
      },
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "register",
        component: RegisterComponent
      },
      {
        path: "applink",
        component: AppLinkComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
];
