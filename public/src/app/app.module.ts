import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { RegComponent } from './reg/reg.component';
import { UserComponent } from './user/user.component';
import { UserSearchComponent } from './user/usersearch/usersearch.component';
import { UpdateComponent } from './user/update/update.component';

import { YelpService } from './yelp.service';
import { MapsService } from './maps.service';
import { UserService } from './user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    RegComponent,
    UserComponent,
    UpdateComponent,
    UserSearchComponent,
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
