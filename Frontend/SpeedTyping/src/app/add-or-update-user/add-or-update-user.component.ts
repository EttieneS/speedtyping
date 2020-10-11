import { Component, OnInit, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-or-update-user',
  templateUrl: './add-or-update-user.component.html',
  styleUrls: ['./add-or-update-user.component.css']
})

export class AddOrUpdateUserComponent implements OnInit {
  @Output() userCreated = new EventEmmitter<any>();
  @Input() userInfo: any;

  public buttonText = 'Save';

  constructor() {
    this.clearUserInfo();
    console.log(this.joggingInfo.date);
  }

  ngOnInit(): void {
  }

  private clearUserInfo = function()){
    this.userInfo = {
      id: undefined,
      name: '',
    };
  };

}
