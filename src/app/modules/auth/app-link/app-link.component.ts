import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { tap, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";

@Component({
  selector: "app-app-link",
  templateUrl: "./app-link.component.html",
  styleUrls: ["./app-link.component.scss"]
})
export class AppLinkComponent implements OnInit {
  form: FormGroup = new FormGroup({
    params: new FormControl("")
  });
  message = "";
  data: any;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}
  public onSubmit({ value, valid }: { value: any; valid: boolean }) {
    this.http.post("/api/user/signup", value).subscribe(
      resp => {
        console.log(resp);
        this.data = resp;
        localStorage.setItem("phitr_token", this.data.token);
        this.router.navigate(["dashboard"]);
      },
      err => {
        this.message = err.error.msg;
      }
    );
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.form.patchValue({ params: JSON.stringify(params) });
    });
  }
}
