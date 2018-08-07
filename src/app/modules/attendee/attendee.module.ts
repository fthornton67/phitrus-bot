import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendeeComponent } from './attendee.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AttendeeComponent
    ],
  exports:[
    AttendeeComponent
    ]
})
export class AttendeeModule { 
  
}
