import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/authentication/auth.service";
import {ContactorService} from "../../services/contactor/contactor.service";

@Component({
  selector: 'app-contactor-navbar',
  templateUrl: './contactor-navbar.component.html',
  styleUrls: ['./contactor-navbar.component.css']
})
export class ContactorNavbarComponent implements OnInit {
  constructor(private service: AuthService,
              private contactorService: ContactorService) {
  }

  user: any = {
    id: "", firstName: "", lastName: "", email: "", phone: "", licenceDto: {id: "", startedAt: "", expiredAt: ""}
  }
  role: string = ""

  public logOut(): void {
    this.service.logout();
  }

  ngOnInit() {
    const email = sessionStorage.getItem('email') as string;
    this.contactorService.getContactorByEmail(email).subscribe({
      next: (res) => {
        console.log(res)
        this.user = res;
      }
    })
  }

}
