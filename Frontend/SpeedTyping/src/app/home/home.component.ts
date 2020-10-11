import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public userData: Array<any>;
  public currentUser: any;

  constructor(private userService: UserService) {
    userService.get().subscribe((data: any) => this.userData = data);
    this.currentUser = this.setInitialValuesForUserData();
  }

  private setInitialValuesForUserData(){
    return{
      id: undefined,
      name: ''
    }
  }

  public createOrUpdateUser = function(user: any) {
    // if jogging is present in joggingData, we can assume this is an update
    // otherwise it is adding a new element
    let userWithId;
    usserWithId = _.find(this.userData, (el => el.id === user.id));

    if (userWithId) {
      const updateIndex = _.findIndex(this.userData, {id: userWithId.id});
      this.userService.update(user).subscribe(
        userRecord =>  this.userData.splice(updateIndex, 1, user)
      );
    } else {
      this.userService.add(user).subscribe(
        userRecord => this.userData.push(user)
      );
    }

    this.currentUser = this.setInitialValuesForUserData();
  };

  ngOnInit(): void {
  }
}
