import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import{SignupService} from "../signup.service";

@Component({
    selector:"app-signup",
    templateUrl:'signup.component.html',
    styleUrls:['signup.component.css'],
    providers:[SignupService]
})

export class SignupComponent implements OnInit{
     firstName:string="";
     lastName:string="";
     emailId:string="";
     password:string="";
     dateOfBirth:string="";
     company:string="";
     address:string="";
     showAlert:boolean=false;
     alertMsg:string="";
     isEmailValid:boolean=true;
     emailRegex: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     
    //  constructor(private router:Router){}
    
    checkEmailValdation(email) {
        let isValid;
        isValid = this.emailRegex.test(email.toLowerCase());
        if (isValid === false) {
          this.showAlert = true;
          this.isEmailValid = false;
          this.alertMsg = "Enter valid email id";
          return;
        } else {
          this.showAlert = false;
          this.isEmailValid = true;
          this.alertMsg = ""
        }
      }

    userSignup(frm){
        this.checkEmailValdation(frm.value.emailId);
        if(frm.value.firstName===""||frm.value.lastName===""||frm.value.emailId===""||frm.value.password===""||frm.value.dateOfBirth===""||frm.value.address===""||frm.value.company===""){
            this.showAlert=true;
            this.alertMsg="Please enter all the fields";
            return;
        }else{
            if(this.isEmailValid===true){
                this.signupService.signup(frm.value).then(()=>{
                    this.router.navigate(['/']);
                }).catch((error)=>{
                    console.log("Error REGISTRATION==>");
                    console.log("Error==>", error.statusText || error.errorMessage);
                })
            }
        }

        
    }   

    constructor(private signupService:SignupService,private router:Router){}

    ngOnInit(){

    }
}
