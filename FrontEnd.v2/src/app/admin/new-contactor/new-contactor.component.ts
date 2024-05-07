import {Component, OnInit} from '@angular/core';
import {Contactor} from "../../models/Contactor";
import {User} from "../../models/User";
import {Router} from "@angular/router";
import {AuthService} from "../../services/authentication/auth.service";
import {ContactorService} from "../../services/contactor/contactor.service";
import {ContactorRequest} from "../../models/ContactorRequest";
import {ContactRequestService} from "../../services/contact-request/contact-request.service";

@Component({
  selector: 'app-new-contactor',
  templateUrl: './new-contactor.component.html',
  styleUrls: ['./new-contactor.component.css']
})
export class NewContactorComponent implements OnInit {
  constructor(private service: ContactorService,
              private authService: AuthService,
              private route: Router,
              private contactorRequestService: ContactRequestService) {
  }


  errorMessage: string = "";
  user: User = {
    firstName: "", lastName: "", email: "", password: "", role: "ENTREPRENEUR"
  }
  contactor: Contactor = {
    email: "", phone: "", firstName: "", lastName: "", address: ""
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

  public saveContactor(): void {
    if (this.contactor.email != null) {
      this.user.email = this.contactor.email;
    }
    this.user.firstName = this.contactor.firstName;
    this.user.lastName = this.contactor.lastName;
    this.request.status = "accepter";
    this.service.saveContactor(this.contactor).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.authService.register(this.user).subscribe({})
          this.contactorRequestService.updateContactorRequest(this.request).subscribe({
            error: (err) => {
              if (err.status === 200) {
                this.route.navigate(['admin/contactor']).then(r => console.log(r));
              }
            }
          })
        } else {
          this.errorMessage = "Un problème est servenu"
        }
      }
    })
  }

  ngOnInit() {
    this.request = JSON.parse(sessionStorage.getItem('request') as any);
  }
}
