import { Component, OnInit } from "@angular/core";
import { Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { Route, Router, ActivatedRoute } from "@angular/router";

import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Store } from "@ngrx/store";
import { IAppState } from "./store";
import { USER_GET } from "./store/profile/profile.actions";
import { ISimpleResponse } from "./shared/interfaces/simple.interface";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private store: Store<IAppState>,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

 
  ngOnInit() {
  
  }
}
