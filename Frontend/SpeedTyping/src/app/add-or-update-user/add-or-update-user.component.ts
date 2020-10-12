import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-or-update-user',
  templateUrl: './add-or-update-user.component.html',
  styleUrls: ['./add-or-update-user.component.css']
})

export class AddOrUpdateUserComponent implements OnInit {
  @Output() userCreated = new EventEmitter<any>();
  @Input() userInfo: any;

  public buttonText = 'Save';

  constructor() {
    this.clearUserInfo();
    console.log(this.userInfo.name);
  }

  ngOnInit(): void {
  }

  private clearUserInfo = function() {
    this.userInfo = {
      id: undefined,
      name: '',
      score: 0,
      competition: false
    };
  };

  public addOrUpdateUserRecord = function(event) {
    this.userCreated.emit(this.userInfo);
    this.clearUserInfo();
  };

}
