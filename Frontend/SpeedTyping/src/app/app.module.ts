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
import { QRCodeModule } from 'angularx-qrcode';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from "@angular/common";

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'add', component: AddUserComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GridUserComponent,
    AddOrUpdateUserComponent,
    AddUserComponent,
    UserDetailsComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    QRCodeModule,
    NgxQRCodeModule,
    NgbModule,
    CommonModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
