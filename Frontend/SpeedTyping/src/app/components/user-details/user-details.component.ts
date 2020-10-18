import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import * as svg from 'save-svg-as-png';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  public currentUser = null;
  public message = '';
  public myAngularxQrCode = {};
  
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private dateAdapter: DateAdapter<Date>) {
      this.dateAdapter.setLocale('en-GB');
    }



  ngOnInit(): void {
    this.message = '';
    this.getUser(this.route.snapshot.paramMap.get('id'));
  }

  getUser(id): void {
    this.userService.get(id)
      .subscribe(
        data => {
          this.currentUser = data;
          var qrcode = JSON.stringify(this.currentUser);
          this.myAngularxQrCode = qrcode;
        },
        error => {
          console.log(error);
        });
  }

  updateUser(): void {
    this.userService.update(this.currentUser.id, this.currentUser)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The user was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteUser(): void {
    this.userService.delete(this.currentUser.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/users']);
        },
        error => {
          console.log(error);
        });
  }

  public downloadImage(){
    var options = {
      height: 256,
      width: 256
    }

    svg.saveSvgAsPng(document.getElementById("qrcode").firstChild.firstChild, "qrcode.png");
  };

}
