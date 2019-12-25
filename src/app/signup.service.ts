import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

signup(data){
 return this.http.post("http://192.168.43.249:8080/manageemployeedetail/manager/registration",data).toPromise().then((response)=>{
    if (response != null) {
      return response;
    }
    else {
      console.log('ERORO IN signup() service');
      return null;
    }
  })
}
  constructor(private http:HttpClient) { }
}
