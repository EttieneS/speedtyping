import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {
  private headers: HttpHeaders;
  private accessPointUrl: string = 'http://localhost:55418/api/Users';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE',
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin':'*'});
  }

  public get() {
    return this.http.get(this.accessPointUrl, {headers: this.headers});
  }

  public add(payload) {
    return this.http.post(this.accessPointUrl, payload, {headers: this.headers});
  }

  public remove(payload) {
    return this.http.delete(this.accessPointUrl + '/' + payload.id, {headers: this.headers});
  }

  public update(payload) {
    return this.http.put(this.accessPointUrl + '/' + payload.id, payload, {headers: this.headers});
  }
}
