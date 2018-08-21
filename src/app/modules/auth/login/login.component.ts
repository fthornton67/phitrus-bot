import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})



export class LoginComponent implements OnInit {
  
loginData = { username:'', password:'' };
message = '';
data: any;
return: string = '';

form:FormGroup =  new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });



  constructor(private http: HttpClient, private router: Router, private route:ActivatedRoute) { 
  }

  public onSubmit({ value, valid }: { value: any, valid: boolean }) {
    this.http.post('/api/user/signin',value).subscribe(resp => {
    this.data = resp;
    localStorage.setItem('phitr_token', this.data.token);
    this.router.navigateByUrl(this.return);

  }, err => {
    this.message = err.error.msg;
  });
  }

  ngOnInit() {
// Get the query params
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/dashboard');
  }

}
