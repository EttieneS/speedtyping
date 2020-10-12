import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grid-user',
  templateUrl: './grid-user.component.html',
  styleUrls: ['./grid-user.component.css']
})
export class GridUserComponent implements OnInit {
  @Output() recordDeleted = new EventEmitter<any>();
  @Output() newClicked = new EventEmitter<any>();
  @Output() editClicked = new EventEmitter<any>();
  @Input() userData: Array<any>;

  public deleteRecord(record) {
    this.recordDeleted.emit(record);
  }

  public editRecord(record) {
    const clonedRecord = Object.assign({}, record);
    this.editClicked.emit(clonedRecord);
  }

  public newRecord() {
    this.newClicked.emit();
  }

  constructor() { }

  ngOnInit(): void {  }
}
