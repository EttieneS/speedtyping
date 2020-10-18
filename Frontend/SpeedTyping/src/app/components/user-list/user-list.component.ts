import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  users: any;
  currentUser = null;
  currentIndex = -1;
  name = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.userService.getAll()
      .subscribe(
        data => {
          this.users = data;
          console.log(data);
        }
      )
  }

  refreshList(): void {
   this.retrieveTutorials();
   this.currentUser = null;
   this.currentIndex = -1;
 }

 setActiveUser(tutorial, index): void {
   this.currentUser = tutorial;
   this.currentIndex = index;
 }

 removeAllUsers(): void {
   this.userService.deleteAll()
     .subscribe(
       response => {
         console.log(response);
         this.retrieveUsers();
       },
       error => {
         console.log(error);
       });
 }

 searchName(): void {
   this.userService.findByName(this.name)
     .subscribe(
       data => {
         this.users = data;
         console.log(data);
       },
       error => {
         console.log(error);
       });
 }
}
