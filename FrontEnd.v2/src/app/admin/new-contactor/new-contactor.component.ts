import {Component} from '@angular/core';
import {Contactor} from "../../models/Contactor";
import {User} from "../../models/User";
import {Router} from "@angular/router";
import {AuthService} from "../../services/authentication/auth.service";
import {ContactorService} from "../../services/contactor/contactor.service";

@Component({
  selector: 'app-new-contactor',
  templateUrl: './new-contactor.component.html',
  styleUrls: ['./new-contactor.component.css']
})
export class NewContactorComponent {
  constructor(private service: ContactorService,
              private authService: AuthService,
              private route: Router) {
  }


  errorMessage: string = "";
  user: User = {
    firstName: "", lastName: "", email: "", password: "", role: "ENTREPRENEUR"
  }
  contactor: Contactor = {
    email: "", phone: "", firstName: "", lastName: "", address: ""
  }

  public saveContactor(): void {
    this.service.saveContactor(this.contactor).subscribe({
      error: (err) => {
        if (err.status === 200) {
          if (this.contactor.email != null) {
            this.user.email = this.contactor.email
            this.user.firstName = this.contactor.firstName
            this.user.lastName = this.contactor.lastName
            this.authService.register(this.user).subscribe({
              error: (err) => {
                if (err.status === 200) {
                  this.route.navigate(['admin/contactor'])
                } else {
                  this.errorMessage = "Un problème est servenu"
                }
              }
            })
          }

        } else {
          this.errorMessage = "Un problème est servenu"
        }
      }
    })
  }
}
