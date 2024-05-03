import {Component, OnInit} from '@angular/core';
import {ContactorService} from "../../services/contactor/contactor.service";
import {WorkerService} from "../../services/worker/worker.service";
import {Router} from "@angular/router";
import {Contactor} from "../../models/Contactor";
import {Worker} from "../../models/Worker";
import {SystemFixingService} from "../../services/system-fixing/system-fixing.service";
import {SystemFixing} from "../../models/system-fixing";

@Component({
  selector: 'app-new-system-fixing',
  templateUrl: './new-system-fixing.component.html',
  styleUrls: ['./new-system-fixing.component.css']
})
export class NewSystemFixingComponent implements OnInit {
  constructor(private systemFixingService: SystemFixingService,
              private contactorService: ContactorService,
              private workerService: WorkerService,
              private route: Router) {
  }

  imageLink: string = "assets/solar%20panel.jpg"
  systemFixing: SystemFixing = {
    company: {id: ""}, quantity: 0, charge: 0, image: "", type: "", installation_method: "", materiel: "",
    model: "", adaptability: "", height: 0, price: 0, width: 0
  }

  contactor: Contactor = {
    id: "", firstName: "", lastName: "", email: "", phone: "", address: "", company: {id: ""}
  }
  worker: Worker = {
    id: "", firstName: "", lastName: "", address: "", email: "", phone: "", profession: "", image: "", company: {id: ""}
  }

  public saveSystemFixing(): void {
    if (this.contactor.company.id != "") {
      this.systemFixing.company.id = this.contactor.company.id
    } else {
      this.systemFixing.company.id = this.worker.company.id
    }
    this.systemFixingService.addSystemFixing(this.systemFixing).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.route.navigate(['contactor/system-fixing'])
        }
      }
    })
  }

  public getUserByEmail(): void {
    let user: string = sessionStorage.getItem('user') as string
    const token: string = sessionStorage.getItem('token') as string;
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
    let decodedToken = JSON.parse(jsonPayLoad);
    switch (user) {
      case 'ENTREPRENEUR': {
        this.contactorService.getContactorByEmail(decodedToken.sub).subscribe({
          next: (res) => {
            this.contactor = res
          }
        })
        break;
      }
      case 'SECRETARE': {
        this.workerService.getWorkerByEmail(decodedToken.sub).subscribe({
          next: (res) => {
            this.worker = res
          }
        })
        break;
      }
    }
  }

  public handleFileInput(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageLink = e.target.result;
      const base64String = reader.result as string;
      this.systemFixing.image = base64String;
    };

    reader.readAsDataURL(file);
  }

  ngOnInit() {
    this.getUserByEmail()
  }
}
