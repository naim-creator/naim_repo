import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/authentication/auth.service";
import {Router} from "@angular/router";
import {User} from "../../models/User";
import {ContactorService} from "../../services/contactor/contactor.service";
import {WorkerService} from "../../services/worker/worker.service";
import {UserService} from "../../services/user/user.service";
import {CompanyService} from "../../services/company/company.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private service: AuthService,
              private route: Router,
              private contactorService: ContactorService,
              private workerService: WorkerService,
              private userService: UserService,
              private companyService: CompanyService) {
  }

  connectedUser: any;
  token: any;
  errorMessage: any = null;
  passwordValid: boolean = true;
  emailValid: boolean = true;
  user: User = {
    email: "", password: "", id: "", enabled: true, lastName: "", firstName: "", role: ""
  }

  public checkValidationPassword(): void {
    this.passwordValid = !(this.user.password.length < 6 && this.user.password.length >= 1);
  }

  public checkValidationEmail(): void {
    this.emailValid = this.user.email.slice(-10) == "@gmail.com";
  }

  public login(): void {
    if (this.user.email == "") {
      this.emailValid = false;
    }
    if (this.user.password == "") {
      this.passwordValid = false;
    }
    if (this.passwordValid && this.emailValid) {
      this.service.login(this.user).subscribe({
        next: (res) => {
          sessionStorage.setItem('token', res.token);
          this.userService.getAccount(this.user.email).subscribe({
            next: (res) => {
              this.connectedUser = res;
              switch (res.authorities[0].authority) {
                case "ADMIN": {
                  sessionStorage.setItem('authority', 'admin')
                  sessionStorage.setItem('email', this.user.email);
                  this.route.navigate(['admin']);
                  break;
                }
                case "ENTREPRENEUR": {
                  sessionStorage.setItem('authority', 'entrepreneur')
                  sessionStorage.setItem('email', this.user.email);
                  this.contactorService.getContactorByEmail(this.user.email).subscribe({
                    next: (res) => {
                      if (res.licenceDto.status === 'activer') {
                        this.companyService.getCompanyByContactorID(res.id).subscribe({
                          next: (res) => {
                            if (res != null) {
                              sessionStorage.setItem('company', JSON.stringify(res));
                              this.route.navigate(['contactor']);
                            }
                          }
                        })
                      } else {
                        this.route.navigate(['licence-expired']);
                      }
                    }
                  })
                  break;
                }
                case "SECRETAIRE": {
                  sessionStorage.setItem('authority', 'secretaire')
                  sessionStorage.setItem('email', this.user.email);
                  this.workerService.getWorkerByEmail(this.user.email).subscribe({
                    next: (res) => {
                      if (res.licenceDto.status === 'activer') {
                        sessionStorage.setItem('company', JSON.stringify(res.companyDto));
                        this.route.navigate(['secretaire']).then();
                      } else {
                        this.route.navigate(['licence-expired']);
                      }
                    }
                  })
                  break;
                }
                case "GESTIONNAIRE": {
                  sessionStorage.setItem('authority', 'gestionnaire')
                  sessionStorage.setItem('email', this.user.email);
                  this.workerService.getWorkerByEmail(this.user.email).subscribe({
                    next: (res) => {
                      if (res.licenceDto.status === 'activer') {
                        sessionStorage.setItem('company', JSON.stringify(res.companyDto));
                        this.route.navigate(['gestionnaire']).then();
                      } else {
                        this.route.navigate(['licence-expired']);
                      }
                    }
                  })
                  break;
                }
                case "TECHNICIEN": {
                  sessionStorage.setItem('authority', 'technicien');
                  sessionStorage.setItem('email', this.user.email);
                  this.workerService.getWorkerByEmail(this.user.email).subscribe({
                    next: (res) => {
                      if (res.licenceDto.status === 'activer') {
                        sessionStorage.setItem('company', JSON.stringify(res.companyDto));
                        this.route.navigate(['technicien']).then();
                      } else {
                        this.route.navigate(['licence-expired']);
                      }
                    }
                  })
                  break;
                }
              }
            }
          })
        }
      })
    }
  }

  ngOnInit() {
    if (this.service.isLoggedIn()) {
      let authority = sessionStorage.getItem('authority') as string;
      switch (authority) {
        case 'admin': {
          this.route.navigate(['admin']);
          break;
        }
        case 'entrepreneur': {
          this.route.navigate(['contactor'])
          break;
        }
        case 'secretaire': {
          this.route.navigate(['secretaire'])
          break;
        }
        case 'gestionnaire': {
          this.route.navigate(['gestionnaire'])
          break;
        }
        case 'technicien': {
          this.route.navigate(['technicien'])
          break;
        }
      }
    }
  }
}
