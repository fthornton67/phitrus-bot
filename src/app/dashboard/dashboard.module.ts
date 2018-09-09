import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendeeModule } from '../modules/attendee/attendee.module';
import { DashboardComponent } from './dashboard.component';
import { routes } from './dashboard.router';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DevicesComponent } from './devices/devices.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import { DeviceGuardService } from '../modules/auth/_services/device-guard.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AttendeeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardComponent,
    DevicesComponent,
    AddDeviceComponent
  ],
  bootstrap: [
    DashboardComponent
  ],
  providers:[DeviceGuardService]
})
export class DashboardModule {}
