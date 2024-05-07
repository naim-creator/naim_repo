import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MeterService} from "../../services/meter/meter.service";
import {Meter} from "../../models/meter";

@Component({
  selector: 'app-new-meter',
  templateUrl: './new-meter.component.html',
  styleUrls: ['./new-meter.component.css']
})
export class NewMeterComponent implements OnInit {
  constructor(private meterService: MeterService,
              private route: Router) {
  }

  imageLink: string = "assets/solar%20panel.jpg";
  companyId: string = "";
  meter: Meter = {
    id: "", model: "", connexion_type: "", image: "", price: 0, quantity: 0, type: "",
    company: {id: ""}, capacity: 0
  }

  public saveMeter(): void {
    this.meter.company.id = this.companyId
    this.meterService.addMeter(this.meter).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.route.navigate(['contactor/meter']).then(r => console.log(r));
        }
      }
    })
  }

  public handleFileInput(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageLink = e.target.result;
      this.meter.image = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  ngOnInit() {
    this.companyId = sessionStorage.getItem('company') as string;
  }
}
