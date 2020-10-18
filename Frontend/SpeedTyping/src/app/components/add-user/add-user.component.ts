import { Component, OnInit } from '@angular/core';
import { UserService }  from 'src/app/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
  user = {
    name: ''
  }
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  saveUser(): void {
    const data = {
      title: this.user.name
    };

    this.userService.create(data)
     .subscribe(
       response => {
         console.log(response);
         this.submitted = true;
       },
       error => {
         console.log(error);
       });
  }

 newUser(): void {
   this.submitted = false;
   this.user = {
     name: ''
   };
 }

}
