import { Component, OnInit } from '@angular/core';
import { UserService } from '../workout.service';

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
  }

  ngOnInit(): void {
  }

}
