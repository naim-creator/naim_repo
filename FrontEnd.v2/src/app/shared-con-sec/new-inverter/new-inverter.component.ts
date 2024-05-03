import {Component, OnInit} from '@angular/core';
import {Contactor} from "../../models/Contactor";
import {Worker} from "../../models/Worker";
import {ContactorService} from "../../services/contactor/contactor.service";
import {WorkerService} from "../../services/worker/worker.service";
import {Router} from "@angular/router";
import {InverterService} from "../../services/inverter/inverter.service";
import {Inverter} from "../../models/inverter";

@Component({
  selector: 'app-new-inverter',
  templateUrl: './new-inverter.component.html',
  styleUrls: ['./new-inverter.component.css']
})
export class NewInverterComponent implements OnInit {
  constructor(private inverterService: InverterService,
              private contactorService: ContactorService,
              private workerService: WorkerService,
              private route: Router) {
  }

  imageLink: string = "assets/solar%20panel.jpg"
  inverter: Inverter = {
    id: "", type: "", company: {id: ""}, phase_number: 0, tension: 0, frequency: "", minimal_circuit_current: 0,
    maximum_circuit_voltage: 0, nominal_power: 0, quantity: 0, model: "", price: 0, image: ""
  }
  contactor: Contactor = {
    id: "", firstName: "", lastName: "", email: "", phone: "", address: "", company: {id: ""}
  }
  worker: Worker = {
    id: "", firstName: "", lastName: "", address: "", email: "", phone: "", profession: "", image: "", company: {id: ""}
  }

  public saveInverter(): void {
    if (this.contactor.company.id != "") {
      this.inverter.company.id = this.contactor.company.id
    } else {
      this.inverter.company.id = this.worker.company.id
    }
    this.inverterService.addInverter(this.inverter).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.route.navigate(['contactor/inverter'])
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
      this.inverter.image = base64String;
    };

    reader.readAsDataURL(file);
  }

  ngOnInit() {
    this.getUserByEmail()
  }
}
