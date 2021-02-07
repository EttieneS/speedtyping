import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddOrUpdateUserComponent } from "./add-or-update-user.component";
import { UsersListComponent } from './components/tutorials-list/tutorials-list.component';
import { UserDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { AddUserComponent } from './components/add-tutorial/add-tutorial.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersListComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'add', component: AddUserComponent },
  { path: 'forms', component: FormsComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
