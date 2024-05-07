import {Component, OnInit} from '@angular/core';
import {BatteryService} from "../../services/battery/battery.service";
import {Battery} from "../../models/battery";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-battery',
  templateUrl: './new-battery.component.html',
  styleUrls: ['./new-battery.component.css']
})
export class NewBatteryComponent implements OnInit {
  constructor(private batteryService: BatteryService,
              private route: Router) {
  }

  imageLink: string = "assets/solar%20panel.jpg";
  companyId: string = ""
  battery: Battery = {
    id: "", type: "", company: {id: ""}, quantity: 0, image: "", price: 0, model: "", date_manufacture: "",
    storage_capacity: 0, operating_temperature: 0, nominal_voltage: 0, life_cycle: "", maximum_load_voltage: 0,
    lifespan: "", maximum_discharge_voltage: 0
  }

  public saveBattery(): void {
    this.battery.company.id = this.companyId;
    this.batteryService.addBattery(this.battery).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.route.navigate(['contactor/battery']).then(r => console.log(r))
        }
      }
    })
  }

  public handleFileInput(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageLink = e.target.result;
      this.battery.image = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  ngOnInit() {
    this.companyId = sessionStorage.getItem('company') as string;
  }
}
