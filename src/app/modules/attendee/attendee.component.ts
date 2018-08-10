import { Component, OnInit,AfterViewInit, Injectable} from '@angular/core';
import { ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { from } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { interval } from 'rxjs';


@Component({
  selector: 'app-attendee',
 
  templateUrl: './attendee.component.html',
  styleUrls: ['./attendee.component.css']
})

@Injectable()
export class AttendeeComponent implements OnInit {
  
  public name:String;

  public id:String;
    private subject = new Subject<any>();

ngOnInit(){
   this.name = 'Fredrick';
    this.id = '0123456';
  // Create an Observable that will create an AJAX request
// Subscribe to create the request
var source1 = interval(1000)
  .flatMap(function(i) {
    return from(ajax('/api/alexa/countar'));
  });
source1.subscribe(
  res => {this.id = res.response.count;} );

  }

}
