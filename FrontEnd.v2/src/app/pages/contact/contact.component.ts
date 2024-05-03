import { Component } from '@angular/core';
import {ContactorRequest} from "../../models/ContactorRequest";
import {ContactRequestService} from "../../services/contact-request/contact-request.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  constructor(private service: ContactRequestService) {
  }

  errorMessage: string = ""
  contactorRequest: ContactorRequest = {
    firstName: "", lastName: "", companyName: "", companyAddress: "", email: "", message: "", phone: "", date : new Date()
  }

  public saveContactorRequest(): void {
    this.service.saveContactorRequest(this.contactorRequest).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.errorMessage = err.error.text

        }
      }
    })
  }
}
