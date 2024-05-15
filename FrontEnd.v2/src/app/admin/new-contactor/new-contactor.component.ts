import {Component, OnInit} from '@angular/core';
import {Contactor} from "../../models/Contactor";
import {User} from "../../models/User";
import {Router} from "@angular/router";
import {AuthService} from "../../services/authentication/auth.service";
import {ContactorService} from "../../services/contactor/contactor.service";
import {ContactorRequest} from "../../models/ContactorRequest";
import {ContactRequestService} from "../../services/contact-request/contact-request.service";
import {Licence} from "../../models/Licence";
import {LicenceService} from "../../services/licence/licence.service";

@Component({
  selector: 'app-new-contactor',
  templateUrl: './new-contactor.component.html',
  styleUrls: ['./new-contactor.component.css']
})
export class NewContactorComponent implements OnInit {
  constructor(private service: ContactorService,
              private authService: AuthService,
              private route: Router,
              private contactorRequestService: ContactRequestService,
              private licenceService: LicenceService) {
  }

  password: string = "";
  errorMessage: string = "";
  validEmail: any = true;
  validPassword: boolean = true;
  validLicence: boolean = true;
  validFirstName: boolean = true;
  validLastName: boolean = true;
  duration: number = 0;

  contactor: Contactor = {
    email: "", phone: "", firstName: "", lastName: "", address: "",
    licenceDto: {id: "", expiredAt: "", startedAt: "", status: ""}
  }

  request: ContactorRequest = {
    email: "",
    firstName: "",
    phone: "",
    message: "",
    companyName: "",
    companyAddress: "",
    lastName: "",
    status: "",
    date: ""
  }

  public checkValidationPassword(): void {
    this.validPassword = !(this.password.length < 6);
  }

  public checkFirstNameValid(): void {
    this.validFirstName = !(this.contactor.firstName == "");
  }

  public checkLastNameValid(): void {
    this.validLastName = !(this.contactor.lastName == "");
  }

  public checkValidationEmail(): void {
    this.validEmail = this.contactor.email.slice(-10) == "@gmail.com";
  }

  public checkValidLicence(event: any): void {
    this.validLicence = !(event.target.value == null);
    this.duration = Number(event.target.value);
  }

  public saveContactor(licence: Licence): void {
    this.contactor.licenceDto = licence
    this.service.saveContactor(this.contactor).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.registerContactor()
        } else {
          this.errorMessage = "Un problème est servenu"
        }
      }
    })
  }

  public registerContactor(): void {
    let user: any = {email: "", password: "", firstName: "", lastName: "", role: "ENTREPRENEUR"}
    user.email = this.contactor.email;
    user.firstName = this.contactor.firstName;
    user.lastName = this.contactor.lastName;
    user.password = this.password;
    this.authService.register(user).subscribe({
      next: (res) => {
        this.updateRequest(this.request);
      },
      error: (err) => {
        if (err.status === 200) {
          sessionStorage.setItem('contactorMessage', err.error.text)
          this.updateRequest(this.request);
        }
      }
    })
  }

  public updateRequest(request: ContactorRequest): void {
    request.status = "accepter";
    this.contactorRequestService.updateContactorRequest(request).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.route.navigate(['admin/contactor']).then(r => sessionStorage.setItem('message', err.error.text));
        }
      }
    })
  }

  public saveLicence(): void {
    this.checkFirstNameValid();
    this.checkLastNameValid();
    this.checkValidationEmail();
    this.checkValidationPassword();
    this.licenceService.saveLicence(this.duration).subscribe({
      next: (res) => {
        this.saveContactor(res);
      }
    })
  }

  ngOnInit() {
    this.request = JSON.parse(sessionStorage.getItem('request') as any);
  }
}
