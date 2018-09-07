import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { routes } from './home.router';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ],
  declarations: [HomeComponent, NotFoundComponent]
})
export class HomeModule { }
