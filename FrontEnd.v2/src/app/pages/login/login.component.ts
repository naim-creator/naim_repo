import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/authentication/auth.service";
import {Router} from "@angular/router";
import {User} from "../../models/User";
import {ContactorService} from "../../services/contactor/contactor.service";
import {WorkerService} from "../../services/worker/worker.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private service: AuthService,
              private route: Router,
              private contactorService: ContactorService,
              private workerService: WorkerService) {
  }

  errorMessage: any = null
  user: User = {
    email: "", password: ""
  }

  public login(): void {
    this.service.login(this.user).subscribe({
      next: (res) => {
        this.service.setToken(res.token);
        const decodedToken = this.service.decodeToken(res.token);
        switch (decodedToken.authorities[0]) {
          case 'ADMIN': {
            sessionStorage.setItem('user', 'admin')
            this.route.navigate(['admin'])
            break;
          }
          case 'ENTREPRENEUR': {
            this.contactorService.getContactorByEmail(decodedToken.sub).subscribe({
              next: (res) => {
                sessionStorage.setItem('user', 'entrepreneur')
                if(res.company != null){
                  sessionStorage.setItem('company', res.company.id);
                }else{
                  sessionStorage.setItem('contactor', res.id)
                }
                this.route.navigate(['contactor'])
              }
            })
            break;
          }
          case 'SECRETAIRE': {
            this.workerService.getWorkerByEmail(decodedToken.sub).subscribe({
              next: (res) => {
                sessionStorage.setItem('user', 'secretaire');
                sessionStorage.setItem('company', res.company.id);
                this.route.navigate(['secretaire']);
              }
            })
            break;
          }
          case 'GESTIONNAIRE': {
            this.workerService.getWorkerByEmail(decodedToken.sub).subscribe({
              next: (res) => {
                sessionStorage.setItem('user', 'gestionnaire');
                sessionStorage.setItem('company', res.company.id);
                this.route.navigate(['gestionnaire']);
              }
            })
            break;
          }
          case 'TECHNICIEN': {
            this.workerService.getWorkerByEmail(decodedToken.sub).subscribe({
              next: (res) => {
                sessionStorage.setItem('user', 'technicien');
                sessionStorage.setItem('company', res.company.id);
                this.route.navigate(['technicien']);
              }
            })
            break;
          }
        }
      }
    })
  }

  ngOnInit() {
    if (this.service.isLoggedIn()) {
      let user = sessionStorage.getItem('user') as string;
      switch (user) {
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
