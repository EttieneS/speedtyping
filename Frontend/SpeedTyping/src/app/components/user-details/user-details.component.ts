import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  public currentUser = null;
  public message = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getUser(this.route.snapshot.paramMap.get('id'));
    console.log("paramID: " + this.route.snapshot.paramMap.get('id'));
  }

  getUser(id): void {
    this.userService.get(id)
      .subscribe(
        data => {
          this.currentUser = data;
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status): void {
    const data = {
      title: this.currentUser.title,
      description: this.currentUser.description,
      published: status
    };

    this.userService.update(this.currentUser.id, data)
      .subscribe(
        response => {
          this.currentUser.competition = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateUser(): void {
    const user = {
      id: this.currentUser.id,
      name: this.currentUser.name,
      lastName: this.currentUser.lastName
    };

    alert("currentUser in update: " + this.currentUser.lastName);

    this.userService.update(this.currentUser.id, this.currentUser)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The user was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteUser(): void {
    this.userService.delete(this.currentUser.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/users']);
        },
        error => {
          console.log(error);
        });
  }

}
