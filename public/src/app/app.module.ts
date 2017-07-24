import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { SearchComponent } from './landing/search/search.component';
import { MapComponent } from './landing/map/map.component';
import { LoginregComponent } from './loginreg/loginreg.component';
import { LoginComponent } from './loginreg/login/login.component';
import { RegComponent } from './loginreg/reg/reg.component';
import { UserComponent } from './user/user.component';
import { SerachComponent } from './user/serach/serach.component';
import { UpdateComponent } from './user/update/update.component';

import { YelpService } from './yelp.service';
import { MapsService } from './maps.service';
import { UserService } from './user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SearchComponent,
    MapComponent,
    LoginregComponent,
    LoginComponent,
    RegComponent,
    UserComponent,
    SerachComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    YelpService,
    MapsService,
    UserService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
