import {Component} from '@angular/core';
import {ContactorService} from "../../services/contactor/contactor.service";
import {Company} from "../../models/Company";
import {Contactor} from "../../models/Contactor";
import {CompanyService} from "../../services/company/company.service";
import {SolarPanelService} from "../../services/solar-panel/solar-panel.service";
import {SystemFixingService} from "../../services/system-fixing/system-fixing.service";
import {InverterService} from "../../services/inverter/inverter.service";

@Component({
  selector: 'app-contactor-home',
  templateUrl: './contactor-home.component.html',
  styleUrls: ['./contactor-home.component.css']
})
export class ContactorHomeComponent {
  constructor(private contactorService: ContactorService,
              private companyService: CompanyService,
              private solarPanelService: SolarPanelService,
              private systemFixingService: SystemFixingService,
              private inverterService: InverterService) {
  }

  companyExist: boolean = false

  company: Company = {
    id: "", name: "", address: "", contact: "", contactor: {id: ""}
  }

  contactor: Contactor = {
    id: "", firstName: "", lastName: "", email: "", phone: "", address: "", company: null
  }

  maxStock: number = 1000
  solarPanelStockLevel: number = 0
  systemFixingStockLevel: number = 0
  inverterStockLevel: number = 0
  batteryStockLevel: number = 0
  cableStockLevel: number = 0
  meterStockLevel: number = 0

  public getContactorByEmail(): void {
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
    this.contactorService.getContactorByEmail(decodedToken.sub).subscribe({
      next: (res) => {
        this.contactor = res;
        if (res.company != null) {
          this.companyExist = true;
          this.company = res.company;
          this.getSolarPanelStockLevel();
          this.getSystemFixingStockLevel();
          this.getInverterStockLevel();
        }
      }
    })
  }

  public saveCompany(): void {
    this.company.contactor = {id: String(this.contactor.id)}
    this.companyService.addCompany(this.company).subscribe({
      error: (err) => {
        console.log(err)
      }
    })
  }

  public getSolarPanelStockLevel(): void {
    this.solarPanelService.getSolarPanelStockLevel(this.contactor.company.id).subscribe({
      next: (res) => {
        this.solarPanelStockLevel = (res * 100) / this.maxStock;
      }
    })
  }

  public getSystemFixingStockLevel(): void {
    this.systemFixingService.getSystemFixingStockLevel(this.contactor.company.id).subscribe({
      next: (res) => {
        this.systemFixingStockLevel = (res * 100) / this.maxStock;
      }
    })
  }

  public getInverterStockLevel(): void {
    this.inverterService.getInverterStockLevel(this.contactor.company.id).subscribe({
      next: (res) => {
        this.inverterStockLevel = (res * 100) / this.maxStock;
      }
    })
  }

  ngOnInit() {
    this.getContactorByEmail()
  }
}
