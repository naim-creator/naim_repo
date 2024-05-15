import {Component, OnInit} from '@angular/core';
import {Company} from "../../models/Company";
import {CompanyService} from "../../services/company/company.service";
import {SolarPanelService} from "../../services/solar-panel/solar-panel.service";
import {SystemFixingService} from "../../services/system-fixing/system-fixing.service";
import {InverterService} from "../../services/inverter/inverter.service";
import {BatteryService} from "../../services/battery/battery.service";
import {MeterService} from "../../services/meter/meter.service";
import {CableService} from "../../services/cable/cable.service";
import {DevisRequestService} from "../../services/devis-request/devis-request.service";
import {WorkerService} from "../../services/worker/worker.service";
import {ContactorService} from "../../services/contactor/contactor.service";
import {Contactor} from "../../models/Contactor";

@Component({
  selector: 'app-contactor-home',
  templateUrl: './contactor-home.component.html',
  styleUrls: ['./contactor-home.component.css']
})
export class ContactorHomeComponent implements OnInit {
  constructor(private companyService: CompanyService,
              private solarPanelService: SolarPanelService,
              private systemFixingService: SystemFixingService,
              private inverterService: InverterService,
              private batteryService: BatteryService,
              private meterService: MeterService,
              private cableService: CableService,
              private devisRequestService: DevisRequestService,
              private workerService: WorkerService,
              private contactorService: ContactorService) {
  }

  companyExist: boolean = false

  company: Company = {
    companyName: "", address: "", contact: "",
    contactorDto: {
      id: "", firstName: "", lastName: "", email: "", phone: "", address: "",
      licenceDto: {id: "", expiredAt: "", startedAt: "", status: ""}
    }
  }
  contactor: Contactor = {
    id: "", firstName: "", lastName: "", email: "", phone: "", address: "",
    licenceDto: {id: "", startedAt: "", expiredAt: "", status: ""}
  }

  licence: any;

  maxStock: number = 1000;
  solarPanelStockLevel: number = 0;
  systemFixingStockLevel: number = 0;
  inverterStockLevel: number = 0;
  batteryStockLevel: number = 0;
  cableStockLevel: number = 0;
  meterStockLevel: number = 0;
  devisRequestTotal: number = 0;
  totalWorker: number = 0;

  public saveCompany(): void {
    this.company.contactorDto = this.contactor;
    this.companyService.addCompany(this.company).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.companyService.getCompanyByContactorID(this.contactor.id).subscribe({
            next: (res) => {
              sessionStorage.setItem('company', res.id);
              location.reload();
            }
          })
        }
      }
    });
  }

  public getSolarPanelStockLevel(id: any): void {
    this.solarPanelService.getSolarPanelStockLevel(id).subscribe({
      next: (res) => {
        if (res != null) {
          this.solarPanelStockLevel = (res * 100) / this.maxStock;
        }
      }
    })
  }

  public getSystemFixingStockLevel(id: any): void {
    this.systemFixingService.getSystemFixingStockLevel(id).subscribe({
      next: (res) => {
        this.systemFixingStockLevel = (res * 100) / this.maxStock;
      }
    })
  }

  public getInverterStockLevel(id: any): void {
    this.inverterService.getInverterStockLevel(id).subscribe({
      next: (res) => {
        this.inverterStockLevel = (res * 100) / this.maxStock;
      }
    })
  }

  public getCableStockLevel(id: any): void {
    this.cableService.getCablesStockLevel(id).subscribe({
      next: (res) => {
        this.cableStockLevel = (res * 100) / this.maxStock;
      }
    })
  }

  public getBatteryStockLevel(id: any): void {
    this.batteryService.getBatteriesStockLevel(id).subscribe({
      next: (res) => {
        this.batteryStockLevel = (res * 100) / this.maxStock;
      }
    })
  }

  public getMeterStockLevel(id: any): void {
    this.meterService.getMetersStockLevel(id).subscribe({
      next: (res) => {
        this.meterStockLevel = (res * 100) / this.maxStock;
      }
    })
  }

  public getDevisRequestTotal(id: any): void {
    this.devisRequestService.getDevisRequestTotal(id).subscribe({
      next: (res) => {
        this.devisRequestTotal = res
      }
    })
  }

  public getWorkerTotal(id: any): void {
    this.workerService.getWorkerTotal(id).subscribe({
      next: (res) => {
        this.totalWorker = res
      }
    })
  }

  public getCompanyById(id: any): void {
    this.companyService.getCompanyById(id).subscribe({
      next: (res) => {
        this.company = res;
      }
    })
  }

  ngOnInit() {
    let companyDto: Company = JSON.parse(sessionStorage.getItem('company') as any);
    this.contactorService.getContactorByEmail(sessionStorage.getItem('email') as string).subscribe({
      next: (res) => {
        this.contactor = res;
      }
    })
    if (companyDto != null) {
      this.companyExist = true
      this.getCompanyById(companyDto.id);
      this.getSolarPanelStockLevel(companyDto.id);
      this.getSystemFixingStockLevel(companyDto.id);
      this.getInverterStockLevel(companyDto.id);
      this.getBatteryStockLevel(companyDto.id);
      this.getMeterStockLevel(companyDto.id);
      this.getCableStockLevel(companyDto.id);
      this.getDevisRequestTotal(companyDto.id);
      this.getWorkerTotal(companyDto.id);
    }

  }
}
