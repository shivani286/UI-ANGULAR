import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../employee.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [EmployeeService]
})

export class HomeComponent implements OnInit {
  empolyeeData: any;
  showModalFlag: boolean = false;
  isAllDataEntered: boolean = false;
  firstName: string = "";
  lastName: string = "";
  address: string = "";
  dateOfBirth: string = "";
  phoneNumber: string = "";
  city: string = "";
  emailId: string = ""
  employeeId: any;
  isEmailValid: boolean = true;
  isPhoneNumberValid: boolean = true;
  emailRegex: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  phoneNumberRegex: any = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

  user: any;
  id: any;
  disabledEmail: boolean = false;
  showAlert: boolean = false;
  alertMsg: string = "";

  toogleModal() {
    this.showModalFlag = !this.showModalFlag;
  }

  updateEmployeeData(obj) {
    this.disabledEmail = true;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.address = obj.address;
    this.dateOfBirth = obj.dateOfBirth;
    this.phoneNumber = obj.phoneNumber;
    this.city = obj.city;
    this.emailId = obj.emailId
    this.employeeId = obj.employeeId
    this.toogleModal()
  }


  deleteEmployeeData(obj) {
    if (confirm("You want to delete employee")) {
      console.log("YES DELETE EMPLOYEE")
      this.employeeService.deleteEmployee(obj.employeeId).then(() => {
        this.getAllEmployeeData();
      }).catch((error) => {
        console.log("Delete Employee==>");
        console.log("Error==>", error.statusText || error.errorMessage);
      })
    } else {
      console.log("DONOT DELETE EMPLOYEE")
      return;
    }

  }

  logout() {
    this.router.navigate(['/']);
    sessionStorage.clear();
  }


  checkEmailValdation(email) {
    let isValid;
    isValid = this.emailRegex.test(email.toLowerCase());
    if (isValid === false) {
      this.showAlert = true;
      this.isEmailValid = false;
      this.alertMsg = "Enter valid email id";
      return;
    } else {
      this.isEmailValid = true;
    }
  }

  checkPhoneNumberValidation(phNumber) {
    let isValid = this.phoneNumberRegex.test(phNumber);
    if (isValid === false) {
      this.showAlert = true;
      this.isPhoneNumberValid = false
      this.alertMsg = "Enter valid phone number having length 10";
      return
    } else {
      this.isPhoneNumberValid = true;
    }
  }

  addEmployee(form) {
    this.checkEmailValdation(form.value.emailId)
    this.checkPhoneNumberValidation(form.value.phoneNumber)
    if (form.value.firstName === "" || form.value.lastName === "" || form.value.emailId === "" || form.value.phoneNumber === "" || form.value.dateOfBirth === "" || form.value.address === "" || form.value.city === "") {
      this.showAlert = true;
      this.alertMsg = "Please enter all the fields";
      return;
    } else {
      if (this.isEmailValid === true && this.isPhoneNumberValid) {
        this.showAlert = false;
        this.alertMsg = "";
        form.value.userId = this.id;

        if (this.employeeId != null || this.employeeId != undefined) {
          form.value.employeeId = this.employeeId;
          delete form.value["emailId"]
        }
        this.employeeService.addEmployeeData(form.value).then(() => {
          this.getAllEmployeeData();
        }).catch((error) => {
          console.log("Add or Update Employeer==>");
          console.log("Error==>", error.statusText || error.errorMessage);
        })
        this.toogleModal();
      }
    }
  }

  getAllEmployeeData() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    if(this.user!=null){
    this.id = this.user.userId
      this.employeeService.getAllEmployeeData(this.id).then((data) => {
        this.empolyeeData = data;
      }).catch((error) => {
        console.log("Error==>", error);
        console.log("Error==>", error.statusText || error.errorMessage);
      })
    }
  }

  constructor(private employeeService: EmployeeService, private router: Router) { }
  ngOnInit() {
    this.getAllEmployeeData();
  }

}
