import {Component, OnInit} from '@angular/core';
import {SolarPanel} from "../../models/solar-panel";
import {SolarPanelService} from "../../services/solar-panel/solar-panel.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-solar-panel',
  templateUrl: './new-solar-panel.component.html',
  styleUrls: ['./new-solar-panel.component.css']
})
export class NewSolarPanelComponent implements OnInit {

  constructor(private solarPanelService: SolarPanelService,
              private route: Router) {
  }

  imageLink: string = "assets/solar%20panel.jpg";
  companyId: string = "";
  solarPanel: SolarPanel = {
    company: {id: ""}, quantity: 0, type_cell: "", image: "", weight: 0, maximum_current: 0, maximum_voltage: 0,
    model: "", nominal_power: 0, width: 0, price: 0, height: 0
  }

  public saveSolarPanel(): void {
    this.solarPanel.company.id = this.companyId
    this.solarPanelService.addSolarPanels(this.solarPanel).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.route.navigate(['contactor/solar-panel']).then(r => console.log(r))
        }
      }
    })
  }

  public handleFileInput(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageLink = e.target.result;
      this.solarPanel.image = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  ngOnInit() {
    this.companyId = sessionStorage.getItem('company') as string;
  }

}
