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
    const deleteIndex = _.findIndex(this.userData, {id: record.id});
    this.userService.remove(record).subscribe(
      result => this.userData.splice(deleteIndex, 1)
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

  public eliminateClicked(record) {
    var arrayLength = this.userData.length;
    var scoreDiff = 500;
    var competitor = {};

    for (var i = 0; i < arrayLength; i++){
      if (!(this.userData[i].id == record['id'])){
        var competitorDiff = difference(record.score, this.userData[i].score);

        if (scoreDiff > competitorDiff){
          scoreDiff = competitorDiff;
          competitor = this.userData[i];
        }
      }
    }

    var theLoser = loser(record, competitor);
    var loserrecord = updateLoser(theLoser);

    const updateIndex = _.findIndex(loserrecord, {id: loserrecord['id']});
    this.userService.update(loserrecord).subscribe(
      userRecord =>  this.userData.splice(updateIndex, 1, loserrecord)
    );

    function updateLoser(record){
      var updateRecord = {
        id: record['id'],
        name: record['name'],
        score: record['score'],
        competition: false
      }

      return updateRecord;
    }

    function loser(a, b){
      var bayes = (Math.random() * 101);

      if (bayes >= 50){
        return a;
      } else {
        return b;
      }
    }

    function difference(a , b){
      var diff = a - b;
      diff = Math.abs(diff);

      return diff;
    }
  }

  ngOnInit(): void {
  }
}
