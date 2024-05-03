import {Component, OnInit} from '@angular/core';
import {SolarPanel} from "../../models/solar-panel";
import {Contactor} from "../../models/Contactor";
import {Worker} from "../../models/Worker";
import {SolarPanelService} from "../../services/solar-panel/solar-panel.service";
import {ContactorService} from "../../services/contactor/contactor.service";
import {WorkerService} from "../../services/worker/worker.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-solar-panel',
  templateUrl: './new-solar-panel.component.html',
  styleUrls: ['./new-solar-panel.component.css']
})
export class NewSolarPanelComponent implements OnInit {

  constructor(private solarPanelService: SolarPanelService,
              private contactorService: ContactorService,
              private workerService: WorkerService,
              private route: Router) {
  }

  imageLink: string = "assets/solar%20panel.jpg"
  solarPanel: SolarPanel = {
    company: {id: ""}, quantity: 0, type_cell: "", image: "", weight: 0, maximum_current: 0, maximum_voltage: 0,
    model: "", nominal_power: 0, width: 0, price: 0, height: 0
  }

  contactor: Contactor = {
    id: "", firstName: "", lastName: "", email: "", phone: "", address: "", company: {id: ""}
  }
  worker: Worker = {
    id: "", firstName: "", lastName: "", address: "", email: "", phone: "", profession: "", image: "", company: {id: ""}
  }

  public saveSolarPanel(): void {
    if (this.contactor.company.id != "") {
      this.solarPanel.company.id = this.contactor.company.id
    } else {
      this.solarPanel.company.id = this.worker.company.id
    }
    console.log(this.solarPanel)
    this.solarPanelService.addSolarPanels(this.solarPanel).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.route.navigate(['contactor/solar-panel'])
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
      this.solarPanel.image = base64String;
    };

    reader.readAsDataURL(file);
  }

  ngOnInit() {
    this.getUserByEmail()
  }

}
