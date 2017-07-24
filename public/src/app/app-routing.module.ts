import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { SearchComponent } from './landing/search/search.component';
import { MapComponent } from './landing/map/map.component';
import { LoginregComponent } from './loginreg/loginreg.component';
import { LoginComponent } from './loginreg/login/login.component';
import { RegComponent } from './loginreg/reg/reg.component';
import { UserComponent } from './user/user.component';
import { UpdateComponent } from './user/update/update.component';


const routes: Routes = [
 { path: '', pathMatch: 'full', component: LandingComponent },
 { path: 'login', component: LoginregComponent},
 { path: 'search', component: LoginregComponent},
 { path: 'user/:user_id', component: UpdateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
