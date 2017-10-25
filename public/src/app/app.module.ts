import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule, MatCheckboxModule, MatSliderModule, MatFormFieldModule, MatGridListModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';

import { YelpService } from './yelp.service';
import { MapsService } from './maps.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSliderModule,
    MatGridListModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    YelpService,
    MapsService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
