import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { RegComponent } from './reg/reg.component';
import { UserComponent } from './user/user.component';
import { UserSearchComponent } from './user/usersearch/usersearch.component';
import { UpdateComponent } from './user/update/update.component';


const routes: Routes = [
 { path: '', pathMatch: 'full', component: LandingComponent },
 { path: 'register', component: RegComponent},
 { path: 'search', component: UserSearchComponent},
 { path: 'user', component: UpdateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
