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
    var defendentId = record.id;
    var leastDiff = 500;
    var competitor = {};

    for(var i = 0; i < this.userData.length; i++){
      if (!(this.userData[i].id == defendentId)){

        var diff = difference(record.score, this.userData[i].score);
        if (leastDiff > diff){
          leastDiff = diff;
          competitor = this.userData[i];
        }
      }
    }

    var loser = getLoser(record, competitor);
    console.log("the loser is: " + loser.name);
    var updatedRecord = createLoser(loser);

    function difference(x, y){
      var diff = x - y;
      return Math.abs(diff);
    }

    function getLoser(x, y){
      var rnd = (Math.floor(Math.random() * 100) + 1);
      if (rnd >= 50){
        return x;
      } else {
        return y;
      }
    }

    function createLoser(user){
      var id = user.id;
      //var name = user.name;

      var loser = {
        id: id,
        name: user.name,
        score: user.score,
        competition: false
      }

      return loser;
    }

    const updateIndex = _.findIndex(updatedRecord, {id: updatedRecord['id']});
    console.log("The record to be updated: ", updatedRecord['name']);

    this.userService.update(updatedRecord).subscribe(
      userRecord =>  this.userData.splice(updateIndex, 1, updatedRecord)
    );
  }

  ngOnInit(): void {
  }
}
