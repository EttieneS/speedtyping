import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../user.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-or-update-user',
  templateUrl: './add-or-update-user.component.html',
  styleUrls: ['./add-or-update-user.component.css']
})

export class AddOrUpdateUserComponent implements OnInit {
  @Output() userCreated = new EventEmitter<any>();
  @Input() userInfo: any;

  public currentUser: any;
  public buttonText = 'Save';
  public userData: Array<any>;

  constructor(
    private userService: UserService,
    private router: Router) {
    this.clearUserInfo();
    userService.get().subscribe((data: any) => this.userData = data);
    this.currentUser = this.setInitialValuesForUserData();
    private userService: UserService,
  }

  ngOnInit(): void {
  }

  private setInitialValuesForUserData(){
    return {
      id: undefined,
      name: ''
      // lastName: '',
      // idNumber: '',
      // cellNumber: ''
      // competition: '',
      // datecreated: ''
    }
  }

  private clearUserInfo = function() {
    this.userInfo = {
      id: undefined,
      name: ''
      // lastName: '',
      // dateCreated: '',
      // idNumber: '',
      // cellnumber: ''
    };
  };

  public addOrUpdateUserRecord = function(event) {
    this.userCreated.emit(this.userInfo);
    this.clearUserInfo();
  };

  public createOrUpdateUser = function(user: any) {
    let userWithId;
    userWithId = _.find(this.userData, (el => el.id === user.id));

    if (userWithId) {
      const updateIndex = _.findIndex(this.userData, {id: userWithId.id});
      this.userService.update(user).subscribe(
        userRecord =>  this.userData.splice(updateIndex, 1, user)
      );
      window.location.href = '';
    } else {
      var randomRating = Math.floor(Math.random() * 501);

      user['score'] = randomRating;
      user['competition']  = true;

      this.userService.add(user).subscribe(
        userRecord => this.userData.push(user)
      );
    }
    this.currentUser = this.setInitialValuesForUserData();
    window.location.href = '';
  };
}
