import {Component} from '@angular/core';
import {AuthService} from "../../services/authentication/auth.service";
import {Router} from "@angular/router";
import {User} from "../../models/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private service: AuthService,
              private route: Router) {
  }

  errorMessage: any = null
  user: User = {
    email: "", password: ""
  }

  public login(): void {
    this.service.login(this.user).subscribe({
      next: (res) => {
        this.service.setToken(res.token);
        location.reload()
      },
      error: (err) => {
        this.errorMessage = err.error.validationErrors
      }
    })
  }

  ngOnInit() {
    if (this.service.isLoggedIn()) {
      const token = sessionStorage.getItem('token');
      if (token != null) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/-/g, '/');
        const jsonPayLoad = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
        );
        let decodedToken: any = JSON.parse(jsonPayLoad);
        if (decodedToken.authorities[0] === 'ENTREPRENEUR') {
          this.route.navigate(['contactor'])
          sessionStorage.setItem('user', 'ENTREPRENEUR')
        } else if (decodedToken.authorities[0] === 'ADMIN') {
          this.route.navigate(['admin'])
          sessionStorage.setItem('user', 'ADMIN')
        } else if (decodedToken.authorities[0] === 'SECRETAIRE') {
          this.route.navigate(['secretaire'])
          sessionStorage.setItem('user', 'SECRETAIRE')
        }
      }

    }
  }
}
