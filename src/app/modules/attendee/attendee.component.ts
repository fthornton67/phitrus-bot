import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-attendee',
 
  templateUrl: './attendee.component.html',
  styleUrls: ['./attendee.component.css']
})
export class AttendeeComponent implements OnInit {
   @Input() name: string;
  @Input() id: string;
  constructor() {
    this.name = 'Fredrick';
    this.id = '0123456'
   }

  ngOnInit() {
  }

}
