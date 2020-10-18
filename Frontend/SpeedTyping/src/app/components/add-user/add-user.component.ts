import { Component, OnInit } from '@angular/core';
import { UserService }  from 'src/app/user.service';
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent {
  user = {
    name: '',
    lastName: '',
    cellNumber: '',
    idNumber: '',
    dateCreated: '',
    dateOfBirth: '',
    score: '',
    competition: ''
  }
  submitted = false;

  constructor(private userService: UserService,
    private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit(): void {}

  saveUser(): void {
    const data = {
      name: this.user.name,
      lastName: this.user.lastName,
      cellNumber: this.user.cellNumber,
      idNumber: this.user.idNumber,
      dateCreated: moment().tz("Africa/Johannesburg").format('yyyy-MM-DD'),
      dateOfBirth: moment(this.user.dateOfBirth).tz("Africa/Johannesburg").format('yyyy-MM-DD'),
      competition: true
    }

    this.userService.create(data)
     .subscribe(
       response => {
         console.log(response);
         this.submitted = true;
         window.location.href = "";
       },
       error => {
         console.log(error);
       });
  }

  newUser(): void {
   this.submitted = false;
   this.user = {
     name: '',
     lastName: '',
     cellNumber: '',
     idNumber: '',
     dateCreated: '',
     dateOfBirth: '',
     score: '',
     competition: ''
   };
  }

}
