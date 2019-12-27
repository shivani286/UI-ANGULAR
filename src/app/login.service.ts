import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  response: any;
  url: string = "";
  body: object = {}

  login(data) {
    this.url = "http://localhost:8080/manager-employee-assignment/api/v1.0/login";
    this.body = {
      userName: data.userName,
      password: data.password
    }
   return this.http.post(this.url,this.body).toPromise().then((response) => {
      if (response != null) {
        return response;
      }
      else {
        console.log('ERROR IN login() service');
        return null;
      }
    });
  }
  constructor(private http: HttpClient) { }
}
