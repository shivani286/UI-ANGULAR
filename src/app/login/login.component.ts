import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from '../login.service';

@Component({
  selector: "app-login",
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers: [LoginService]
})

export class LoginComponent implements OnInit {
  userName: string = "";
  password: string = "";
  response: object = {};
  emailRegex: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showAlert: boolean = false;
  alertMsg: String = "";
  isEmailValid: boolean = true;

  checkEmailValdation(email) {
    let isValid;
    isValid = this.emailRegex.test(email.toLowerCase());
    if (isValid === false) {
      this.showAlert = true;
      this.isEmailValid = false;
      this.alertMsg = "Enter valid email id"
      return;
    } else {
      this.showAlert = false;
      this.isEmailValid = true;
      this.alertMsg = ""
    }

  }

  userLogin(data) {
    this.checkEmailValdation(data.value.userName)
    if (data.value.userName === "" || data.value.password === "") {
      this.showAlert = true;
      this.alertMsg = "Please check the fields"
      return;
    }
    else {
      if (this.isEmailValid === true) {
        this.response = this.loginService.login(data.value)
        this.loginService.login(data.value).then((data) => {
          sessionStorage.setItem("user", JSON.stringify(data));
          this.response = data;
          this.router.navigate(['/home']);
        }).catch((error) => {
          console.log("Login ERROR==>");
          console.log("Error==>", error.statusText || error.errorMessage);
        })
      }
    }
  }




  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {

  }
}