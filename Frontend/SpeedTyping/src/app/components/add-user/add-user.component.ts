import { Component, OnInit } from '@angular/core';
import { UserService }  from 'src/app/user.service';
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment-timezone';
import { NgForm, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

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
  public userdetailsForm: FormGroup;


  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userdetailsForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(60)])
      //lastName: new FormControl('', [Validators.required, Validators.maxLength(60)])
    });
  }

  saveUser(user): void {
    const data = {
      lastName: user.lastName,
      //cellNumber: user.cellNumber,
      // idNumber: this.user.idNumber,
      // dateCreated: moment().tz("Africa/Johannesburg").format('yyyy-MM-DD'),
      // dateOfBirth: moment(this.user.dateOfBirth).tz("Africa/Johannesburg").format('yyyy-MM-DD'),
      // competition: true,
      // score: Math.floor(Math.random() * 501),
      name: user.name
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

  public hasError = (controlName: string, errorName: string) =>{
    return this.userdetailsForm.controls[controlName].hasError(errorName);
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
