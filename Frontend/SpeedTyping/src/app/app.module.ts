import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { HomeComponent } from './home/home.component';
import { GridUserComponent } from './grid-user/grid-user.component';
import { AddOrUpdateUserComponent } from './add-or-update-user/add-or-update-user.component';
import { RouterModule, Routes } from '@angular/router';

import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';

import { DecimalPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as _ from 'lodash';

const appRoutes: Routes = [
  { path: '', component: HomeComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GridUserComponent,
    AddOrUpdateUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
