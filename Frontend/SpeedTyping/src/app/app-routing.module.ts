import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddOrUpdateUserComponent } from "./add-or-update-user.component";

const routes: Routes = [
  { path: 'newdiv', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersListComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'add', component: AddUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
