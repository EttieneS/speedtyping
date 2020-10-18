import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import * as _ from 'lodash';
import * as svg from 'save-svg-as-png';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

const imageOptions = {
  width: 256
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public userData: Array<any>;
  public currentUser: any;
  public myAngularxQrCode: any;

  href = '';
  display = false;
  value = {};
  elementType: 'url' | 'canvas' | 'img';

  constructor(private userService: UserService) {
    userService.get().subscribe((data: any) => this.userData = data);
    this.currentUser = this.setInitialValuesForUserData();
    this.myAngularxQrCode = {};
  }

  private setInitialValuesForUserData(){
    return {
      id: undefined,
      name: '',
      lastName: '',
      idNumber: '',
      cellNumber: ''
      // competition: '',
      // datecreated: ''
    }
  }

  public editClicked = function(record) {
    this.currentUser = record;
    var qrcode = JSON.stringify(record);
    this.myAngularxQrCode = qrcode;
    this.display = true;
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

  public downloadImage(){
    var options = {
      height: 256,
      width: 256
    }

    svg.saveSvgAsPng(document.getElementById("qrcode").firstChild.firstChild, "qrcode.png");
  };

  ngOnInit(): void {

  }
}
