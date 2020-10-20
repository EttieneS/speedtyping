import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class UserService {
  private headers: HttpHeaders;
  private accessPointUrl: string = 'http://localhost:55418/api/Users';
  private baseUrl = 'http://localhost:55418/api/Users';
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE',
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin':'*'});
  }

  // public get() {
  //   return this.http.get(this.accessPointUrl, {headers: this.headers});
  // }
  //
  // public add(payload) {
  //   return this.http.post(this.accessPointUrl, payload, {headers: this.headers});
  // }
  //
  // public remove(payload) {
  //   return this.http.delete(this.accessPointUrl + '/' + payload.id, {headers: this.headers});
  // }

  // public update(payload) {
  //   return this.http.put(this.accessPointUrl + '/' + payload.id, payload, {headers: this.headers});
  // }

  getAll(): Observable<any> {
   return this.http.get(this.baseUrl);
 }

 public get(id) {
  return this.http.get(this.accessPointUrl + '/' + id, {headers: this.headers});
 }

 create(data): Observable<any> {
   return this.http.post(this.baseUrl, data);
 }

 update(id, record) {
   this.http.put(this.accessPointUrl + '/' + id, record, {headers: this.headers}).subscribe(data => {
     console.log(data);
   });
   window.location.href = "";
   return record;
 }

 delete(record) {
  this.http.delete(this.accessPointUrl + '/' + record, {headers: this.headers}).subscribe(data => {});

  return record;
 }

 deleteAll(): Observable<any> {
   return this.http.delete(this.baseUrl);
 }

 findByName(title): Observable<any> {
   return this.http.get(`${this.baseUrl}?name=${name}`);
 }
}
