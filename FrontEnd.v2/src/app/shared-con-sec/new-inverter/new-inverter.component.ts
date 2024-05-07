import {Component, OnInit} from '@angular/core';
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
              private route: Router) {
  }

  imageLink: string = "assets/solar%20panel.jpg";
  companyId: string = "";
  inverter: Inverter = {
    id: "", type: "", company: {id: ""}, phase_number: 0, tension: 0, frequency: "", minimal_circuit_current: 0,
    maximum_circuit_voltage: 0, nominal_power: 0, quantity: 0, model: "", price: 0, image: ""
  }

  public saveInverter(): void {
    this.inverter.company.id = this.companyId;
    this.inverterService.addInverter(this.inverter).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.route.navigate(['contactor/inverter']).then(r => console.log(r))
        }
      }
    })
  }

  public handleFileInput(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageLink = e.target.result;
      this.inverter.image = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  ngOnInit() {
    this.companyId = sessionStorage.getItem('company') as string;
  }
}
