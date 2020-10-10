import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grid-user',
  templateUrl: './grid-user.component.html',
  styleUrls: ['./grid-user.component.css']
})
export class GridUserComponent implements OnInit {
  @Input() userData: Array<any>;
  
  constructor() { }

  ngOnInit(): void {
  }

}
