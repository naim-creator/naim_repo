import { Component } from '@angular/core';
import {AuthService} from "../../services/authentication/auth.service";

@Component({
  selector: 'app-contactor-navbar',
  templateUrl: './contactor-navbar.component.html',
  styleUrls: ['./contactor-navbar.component.css']
})
export class ContactorNavbarComponent {
  constructor(private service : AuthService) {
  }

  public logOut():void{
    this.service.logout();
  }
}
