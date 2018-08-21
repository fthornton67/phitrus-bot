import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
form:FormGroup =  new FormGroup({
    email: new FormControl('fthornton67@gmail.com'),
    password: new FormControl('Onward_2012'),
    verify: new FormControl('Onward_2012'),
    phone: new FormControl('4253065668')

  });

message = '';
data: any;
  constructor(private http: HttpClient, private router: Router) { }

  public onSubmit({ value, valid }: { value: any, valid: boolean }) {
    this.http.post('/api/user/signup',value).subscribe(resp => {
      console.log(resp);
    this.data = resp;
    localStorage.setItem('phitr_token', this.data.token);
    this.router.navigate(['dashboard']);
  }, err => {
    this.message = err.error.msg;
  });
  }

  ngOnInit() {
  }

}
