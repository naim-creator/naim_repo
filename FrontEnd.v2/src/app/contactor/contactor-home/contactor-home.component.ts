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
              private workerService: WorkerService) {
  }

  companyExist: boolean = false

  company: Company = {
    name: "", address: "", contact: "", contactor: {id: ""}
  }

  contactorId: string = "";
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
    this.company.contactor = {id: this.contactorId}
    this.companyService.addCompany(this.company).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.companyService.getCompanyByContactorID(this.contactorId).subscribe({
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
        this.solarPanelStockLevel = (res * 100) / this.maxStock;
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
    let companyId: string = sessionStorage.getItem('company') as string;
    this.contactorId = sessionStorage.getItem('contactor') as string;
    if (companyId != null) {
      this.companyExist = true
      this.getCompanyById(companyId);
      this.getSolarPanelStockLevel(companyId);
      this.getSystemFixingStockLevel(companyId);
      this.getInverterStockLevel(companyId);
      this.getBatteryStockLevel(companyId);
      this.getMeterStockLevel(companyId);
      this.getCableStockLevel(companyId);
      this.getDevisRequestTotal(companyId);
      this.getWorkerTotal(companyId);
    }

  }
}
