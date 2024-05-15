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

  imageLink: string = "assets/noImage.jpg";
  companyId: string = "";
  validModel: boolean = true;
  validPower: boolean = true;
  validVoltage: boolean = true;
  validCurrent: boolean = true;
  validHeight: boolean = true;
  validWidth: boolean = true;
  validWeight: boolean = true;
  validPrice: boolean = true;
  solarPanel: SolarPanel = {
    companyDto: {
      id: "", companyName: "", contactorDto: {
        id: "", firstName: "", lastName: "", address: "", email: "", phone: "",
        licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
      }, address: "", contact: ""
    }, quantity: 0, type_cell: "", image: "", weight: 0, maximum_current: 0, maximum_voltage: 0,
    model: "", nominal_power: 0, width: 0, price: 0, height: 0
  }

  public saveSolarPanel(): void {
    this.checkValidModel();
    this.checkValidCurrent();
    this.checkValidHeight();
    this.checkValidPower();
    this.checkValidWidth();
    this.checkValidVoltage();
    this.checkValidPrice();
    this.checkValidWeight()
    if (this.validPrice && this.validWeight && this.validHeight && this.validWidth && this.validCurrent && this.validModel && this.validVoltage && this.validPower) {
      this.solarPanelService.addSolarPanels(this.solarPanel).subscribe({
        error: (err) => {
          if (err.status === 200) {
            this.route.navigate(['contactor/solar-panel']).then(r => sessionStorage.setItem('message', 'panneaux solaire est enregistré'))
          }
        }
      })
    }
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

  public checkValidModel(): void {
    this.validModel = this.solarPanel.model !== "";
  }

  public checkValidPower(): void {
    this.validPower = this.solarPanel.nominal_power !== 0;
  }

  public checkValidVoltage(): void {
    this.validVoltage = this.solarPanel.maximum_voltage !== 0;
  }

  public checkValidCurrent(): void {
    this.validCurrent = this.solarPanel.maximum_current !== 0;
  }

  public checkValidHeight(): void {
    this.validHeight = this.solarPanel.height !== 0;
  }

  public checkValidWidth(): void {
    this.validWidth = this.solarPanel.width !== 0;
  }

  public checkValidWeight(): void {
    this.validWeight = this.solarPanel.weight !== 0;
  }

  public checkValidPrice(): void {
    this.validPrice = this.solarPanel.price !== 0;
  }

  ngOnInit() {
    this.solarPanel.companyDto = JSON.parse(sessionStorage.getItem('company') as any);
  }

}
