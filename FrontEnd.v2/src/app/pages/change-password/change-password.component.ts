import {Component} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {ChangePassword} from "../../models/ChangePassword";
import {Router} from "@angular/router";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  constructor(private userService: UserService,
              private route: Router) {
  }

  request: ChangePassword = {
    email: "", confirmationPassword: "", newPassword: ""
  }

  error: boolean = false;
  requestLoading: boolean = false;
  errorMessage: string = ""
  codeSent: boolean = false;
  codeConfirmed: boolean = false;
  code: string = ""
  passwordValid: boolean = true;
  passwordConfirmed: boolean = true;
  emailValid: boolean = true;

  public sendChangePasswordCode(): void {
    this.requestLoading = true;
    this.userService.sendChangePasswordCode(this.request.email).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.errorMessage = err.error.text;
          this.codeSent = true;
          this.error = false;
        } else {
          this.error = true;
          this.errorMessage = "Email Non valid";
        }
        this.requestLoading = false;
      }
    })
  }

  public checkValidationPassword(): void {
    this.passwordValid = !(this.request.newPassword.length < 6 && this.request.newPassword.length >= 1);
  }

  public checkConfirmedPassword(): void {
    this.passwordConfirmed = !(this.request.confirmationPassword != this.request.newPassword)
  }

  public checkValidationEmail(): void {
    this.emailValid = this.request.email.slice(-10) == "@gmail.com";
  }

  public confirmCode(): void {
    this.requestLoading = true;
    this.userService.confirmCode(this.code).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.codeConfirmed = true;
          this.errorMessage = err.error.text
          this.error = false;
        } else {
          this.error = true;
          this.errorMessage = "Code Invalid";
        }
        this.requestLoading = false;
      }
    })
  }

  public changePassword(): void {
    this.requestLoading = true
    this.userService.changePassword(this.request).subscribe({
      next:(res)=>{
        this.requestLoading = false;
        this.route.navigate(['login'])
      },error:(err)=>{
        if (err.status === 200){
          this.requestLoading = false;
          this.route.navigate(['login'])
        }
      }
    })
  }
}
