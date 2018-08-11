import { Component, OnInit,AfterViewInit, Injectable} from '@angular/core';
import { ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { from } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { interval } from 'rxjs';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
 
 pubilc devices:any;
  constructor() { }

  ngOnInit() {
    var source1 = interval(1000)
  .flatMap(function(i) {
    return from(ajax('/api/alexa/devices'));
  });
source1.subscribe(

  res => {
    console.log(res.response);
    this.devices = res.response;
    } );

  }
  }

}
