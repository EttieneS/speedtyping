import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../user.service';
import * as _ from 'lodash';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  public users: any;
  public currentUser = null;

  public currentIndex = -1;
  public name = '';

  displayedColumns = ["id", "name"];
  dataSource: MatTableDataSource<User>;

 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;



constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.retrieveUsers();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  retrieveUsers(): void {
    this.userService.getAll()
      .subscribe(
        data => {
          this.users = data;
          this.dataSource.data = data;
        }
      )
  }

  refreshList(): void {
   this.retrieveUsers();
   this.currentUser = null;
   this.currentIndex = -1;
 }

 setActiveUser(user, index): void {
   this.currentUser = user;
   this.currentIndex = index;
 }

 removeAllUsers(): void {
   this.userService.deleteAll()
     .subscribe(
       response => {
         console.log(response);
         this.retrieveUsers();
       },
       error => {
         console.log(error);
       });
 }

 searchName(): void {
   this.userService.findByName(this.name)
     .subscribe(
       data => {
         this.users = data;
         console.log(data);
       },
       error => {
         console.log(error);
       });
 }

 deleteUser(id): void {
   this.userService.delete(id);
 }

 // eliminateUser(record) {
 //   var arrayLength = this.users.length;
 //   var scoreDiff = 500;
 //   var competitor = {};
 //
 //   for (var i = 0; i < arrayLength; i++){
 //     if (!(this.users[i].id == record['id'])){
 //       var competitorDiff = difference(record.score, this.users[i].score);
 //
 //       if (scoreDiff > competitorDiff){
 //         scoreDiff = competitorDiff;
 //         competitor = this.users[i];
 //       }
 //     }
 //   }

   // var theLoser = loser(record, competitor);
   // var loserrecord = updateLoser(theLoser);

   // const updateIndex = _.findIndex(loserrecord, {id: loserrecord['id']});
   // this.userService.update(loserrecord['id'], loserrecord).subscribe(
   //   userRecord =>  this.users.splice(updateIndex, 1, loserrecord)
   // );

   // function updateLoser(record){
   //   var updateRecord = {
   //     id: record['id'],
   //     name: record['name'],
   //     lastName: record['lastName'],
   //     idNumber: record['idNumber'],
   //     cellNumber: record['cellNumber'],
   //     dateCreated: record['dateCreated'],
   //     dateOfBirth: record['dateOfBirth'],
   //     score: record['score'],
   //     competition: false
   //   }
   // }
   //
   // function loser(a, b){
   //   var bayes = (Math.random() * 101);
   //
   //   if (bayes >= 50){
   //     return a;
   //   } else {
   //     return b;
   //   }
   // }
   //
   // function difference(a , b){
   //   var diff = a - b;
   //   diff = Math.abs(diff);
   //
   //   return diff;
   // }

   //return updateRecord;
 // }
}
