import { Route } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";

import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Store } from "@ngrx/store";

export const routes: Route[] = [
  {
    path:'',
    component: HomeComponent,
    children: [
      {
        path: "not-found",
        component: NotFoundComponent
      }
    ]
  },
  {
    path: "not-found",
    component: NotFoundComponent
  }
];
