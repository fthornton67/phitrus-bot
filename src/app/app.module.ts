import { BrowserModule } from '@angular/platform-browser';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from './modules/auth/auth.module';
import { HomeModule } from './modules/home/home.module';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { routes } from './app.router';
import { metaReducers, reducers } from './store';
import { SharedModule } from './shared/shared.module';
import { WeatherService } from './weather/weather.service';
import { WeatherEffects } from './store/weather/weather.effects';
import { FeedEffects } from './store/feed/feed.effects';
import { ProfileEffects } from './store/profile/profile.effects';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AuthModule,
    HomeModule,
    BrowserModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      ProfileEffects,
      FeedEffects,
      WeatherEffects
    ]),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [],
    RouterModule.forRoot(
      routes,
      {
        paramsInheritanceStrategy:'always'
      }
    )
  ],
  providers: [
    WeatherService,Location,{provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
