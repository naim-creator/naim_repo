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

  imageLink: string = "assets/noImage.jpg";
  companyId: string = "";
  validModel: boolean = true;
  validPower: boolean = true;
  validTension: boolean = true;
  validVoltage: boolean = true;
  validCurrent: boolean = true;
  validPhase: boolean = true;
  validType: boolean = true;
  validFrequency: boolean = true;
  validPrice: boolean = true;
  inverter: Inverter = {
    id: "", type: "", companyDto: {
      id: "", companyName: "", contactorDto: {
        id: "", firstName: "", lastName: "", address: "", email: "", phone: "",
        licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
      }, address: "", contact: ""
    }, phase_number: 0, tension: 0, frequency: "", minimal_circuit_current: 0,
    maximum_circuit_voltage: 0, nominal_power: 0, quantity: 0, model: "", price: 0, image: ""
  }

  public saveInverter(): void {
    this.checkValidPower()
    this.checkCurrent()
    this.checkPrice()
    this.checkValidModel()
    this.checkValidVoltage()
    this.checkValidPhase()
    this.checkValidFrequency()
    this.checkValidTension()
    this.checkValidPower()
    this.checkValidType()
    if( this.validVoltage &&this.validPrice && this.validFrequency && this.validType && this.validPower && this.validTension && this.validPhase && this.validModel && this.validCurrent){
      this.inverter.companyDto.id = this.companyId;
      this.inverterService.addInverter(this.inverter).subscribe({
        error: (err) => {
          if (err.status === 200) {
            this.route.navigate(['contactor/inverter']).then(r => sessionStorage.setItem('message', 'onduleur est ajouté'))
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
      this.inverter.image = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  public checkValidModel(): void {
    this.validModel = this.inverter.model !== "";
  }

  public checkValidPower(): void {
    this.validPower = this.inverter.nominal_power !== 0;
  }

  public checkValidTension(): void {
    this.validTension = this.inverter.tension !== 0;
  }

  public checkValidVoltage(): void {
    this.validVoltage = this.inverter.maximum_circuit_voltage !== 0;
  }

  public checkCurrent(): void {
    this.validCurrent = this.inverter.minimal_circuit_current !== 0;
  }

  public checkValidPhase(): void {
    this.validPhase = this.inverter.phase_number !== 0;
  }

  public checkValidType(): void {
    this.validType = this.inverter.type !== "";
  }

  public checkValidFrequency(): void {
    this.validFrequency = this.inverter.frequency !== "";
  }

  public checkPrice(): void {
    this.validPrice = this.inverter.price !== 0;
  }

  ngOnInit() {
    this.companyId = sessionStorage.getItem('company') as string;
  }
}
