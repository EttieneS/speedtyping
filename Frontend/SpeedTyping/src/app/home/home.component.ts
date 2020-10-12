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

  public editClicked = function(record) {
    this.currentUser = record;
  };

  public newClicked = function() {
    this.currentUser = this.setInitialValuesForJoggingData();
  };

  public deleteClicked(record) {
    const deleteIndex = _.findIndex(this.joggingData, {id: record.id});
    this.userService.remove(record).subscribe(
      result => this.joggingData.splice(deleteIndex, 1)
    );
  }

  public createOrUpdateUser = function(user: any) {
    let userWithId;
    userWithId = _.find(this.userData, (el => el.id === user.id));

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
