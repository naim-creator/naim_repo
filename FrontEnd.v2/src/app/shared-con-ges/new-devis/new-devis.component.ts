import {Component, OnInit} from '@angular/core';
import {DevisRequest} from "../../models/DevisRequest";
import {SharedDataService} from "../../services/shared-data/shared-data.service";
import {Devis} from "../../models/Devis";
import {SolarPanelService} from "../../services/solar-panel/solar-panel.service";
import {Worker} from "../../models/Worker";
import {Contactor} from "../../models/Contactor";
import {SolarPanel} from "../../models/solar-panel";
import {Inverter} from "../../models/inverter";
import {Battery} from "../../models/battery";
import {Meter} from "../../models/meter";
import {Cable} from "../../models/cable";
import {SystemFixing} from "../../models/system-fixing";
import {InverterService} from "../../services/inverter/inverter.service";
import {BatteryService} from "../../services/battery/battery.service";
import {SystemFixingService} from "../../services/system-fixing/system-fixing.service";
import {CableService} from "../../services/cable/cable.service";
import {MeterService} from "../../services/meter/meter.service";
import {DevisService} from "../../services/devis/devis.service";
import {Router} from "@angular/router";
import {DevisRequestService} from "../../services/devis-request/devis-request.service";

@Component({
  selector: 'app-new-devis',
  templateUrl: './new-devis.component.html',
  styleUrls: ['./new-devis.component.css']
})
export class NewDevisComponent implements OnInit {

  constructor(private sharedDataService: SharedDataService,
              private solarPanelService: SolarPanelService,
              private inverterService: InverterService,
              private batteryService: BatteryService,
              private systemFixingService: SystemFixingService,
              private cableService: CableService,
              private meterService: MeterService,
              private devisService: DevisService,
              private devisRequestService: DevisRequestService,
              private route: Router) {
  }

  devis: Devis = {
    date: "", ref: "", status: "",
    company: {id: ""},
    devisRequest: {id: ""},
    battery: {modelBattery: "", priceBattery: 0, quantityBattery: 0, totalBattery: 0, tvaBattery: 0},
    cable: {modelCable: "", priceCable: 0, quantityCable: 0, totalCable: 0, tvaCable: 0},
    meter: {modelMeter: "", priceMeter: 0, quantityMeter: 0, totalMeter: 0, tvaMeter: 0},
    inverter: {modelInverter: "", priceInverter: 0, quantityInverter: 0, totalInverter: 0, tvaInverter: 0},
    solarPanel: {modelSolarPanel: "", priceSolarPanel: 0, quantitySolarPanel: 0, totalSolarPanel: 0, tvaSolarPanel: 0},
    systemFixing: {
      modelSystemFixing: "",
      priceSystemFixing: 0,
      quantitySystemFixing: 0,
      totalSystemFixing: 0,
      tvaSystemFixing: 0
    },
    total: 0
  }

  devisRequest: DevisRequest = {
    firstName: "", lastName: "", email: "", phone: "", building_type: "", location: "", post_code: "",
    roof_type: "", consumption: 0, electricity_access: false, available_area: 0, company: {id: ""}, status: "en attente"
  }

  solarPanel: SolarPanel = {
    id: "", price: 0, model: "", type_cell: "", weight: 0, height: 0, width: 0, company: {id: ""}, maximum_voltage: 0,
    maximum_current: 0, quantity: 0, nominal_power: 0, image: ""
  }

  inverter: Inverter = {
    id: "", price: 0, company: {id: ""}, model: "", frequency: "", phase_number: 0, quantity: 0, image: "", tension: 0,
    nominal_power: 0, type: "", maximum_circuit_voltage: 0, minimal_circuit_current: 0
  }

  battery: Battery = {
    id: "", type: "", company: {id: ""}, quantity: 0, image: "", price: 0, model: "", date_manufacture: "",
    storage_capacity: 0, operating_temperature: 0, nominal_voltage: 0, life_cycle: "", maximum_load_voltage: 0,
    lifespan: "", maximum_discharge_voltage: 0
  }

  systemFixing: SystemFixing = {
    id: 0, company: {id: ""}, quantity: 0, charge: 0, image: "", type: "", installation_method: "", materiel: "",
    model: "", adaptability: "", height: 0, price: 0, width: 0
  }

  cable: Cable = {
    type: "", company: {id: ""}, model: "", section_transversal: "", image: "", price: 0, quantity: 0,
    material: "", isolation: "", diameter: 0, length: 0, resistance: 0, nominal_voltage: 0
  }

  meter: Meter = {
    id: "", model: "", connexion_type: "", image: "", price: 0, quantity: 0, type: "",
    company: {id: ""}, capacity: 0
  }

  SolarPanelList: any[] = [];
  SystemFixingList: any[] = [];
  InverterList: any[] = [];
  MeterList: any[] = [];
  CableList: any[] = [];
  BatteryList: any[] = [];
  Tva: any = [0, 5, 10, 15];
  pageNo: number = 0;
  worker: Worker = this.sharedDataService.worker;
  contactor: Contactor = this.sharedDataService.contactor;
  solarPanelTotalPages: number = 0;
  inverterTotalPages: number = 0;
  batteryTotalPages: number = 0;
  systemFixingTotalPages: number = 0;
  cableTotalPages: number = 0;
  meterTotalPages: number = 0;
  companyId: string = "";
  stockErrorMessage: string = "";
  chooseSolarPanel: string = "choisir un panneau  solaire";
  chooseInverter: string = "choisir un onduleur";
  chooseBattery: string = "choisir une batterie";
  chooseSystemFixing: string = "choisir un system de fixation";
  chooseCable: string = "choisir un cable";
  chooseMeter: string = "chosisr un meter";

  public saveDevis(): void {
    this.devis.company = {id: this.companyId};
    this.devis.devisRequest = {id: this.devisRequest.id};
    this.devis.date = new Date();
    this.devis.ref = this.generate_ref();
    this.devis.status = "à envoyer";
    this.devisRequest.status = "fait";
    this.devisService.addDevis(this.devis).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.devisRequestService.updateDevisRequest(this.devisRequest).subscribe({})
          this.route.navigate(['contactor/devis'])
        }
      }
    })
  }

  public selectSolarPanel(sp: SolarPanel): void {
    this.devis.solarPanel.priceSolarPanel = sp.price
    this.devis.solarPanel.modelSolarPanel = sp.model
    this.chooseSolarPanel = sp.model
    this.solarPanel = sp
  }

  public selectInverter(inv: Inverter): void {
    this.devis.inverter.priceInverter = inv.price;
    this.devis.inverter.modelInverter = inv.model;
    this.chooseInverter = inv.model;
    this.inverter = inv;
  }

  public selectBattery(bt: Battery): void {
    this.devis.battery.priceBattery = bt.price;
    this.devis.battery.modelBattery = bt.model;
    this.chooseBattery = bt.model;
    this.battery = bt;
  }

  public selectSysTemFixing(sf: SystemFixing): void {
    this.devis.systemFixing.priceSystemFixing = sf.price;
    this.devis.systemFixing.modelSystemFixing = sf.model;
    this.chooseSystemFixing = sf.model;
    this.systemFixing = sf;
  }

  public selectMeter(mt: Meter): void {
    this.devis.meter.priceMeter = mt.price;
    this.devis.meter.modelMeter = mt.model;
    this.chooseMeter = mt.model;
    this.meter = mt;
  }

  public selectCable(c: Cable): void {
    this.devis.cable.priceCable = c.price;
    this.devis.cable.modelCable = c.model;
    this.chooseCable = c.model;
    this.cable = c;
  }

  public generate_ref(): string {
    let ref: string = "ref_";
    ref += String(this.devisRequest.id).slice(1, 10);
    return ref;
  }

  public checkStockValid(stock: string) {
    switch (stock) {
      case 'sp': {
        if (this.devis.solarPanel.quantitySolarPanel > this.solarPanel.quantity && this.solarPanel.id != "") {
          this.stockErrorMessage = "stock des panneaux solaire insuffiante";
        } else {
          this.stockErrorMessage = "";
        }
        break;
      }
      case 'inv': {
        if (this.devis.inverter.quantityInverter > this.inverter.quantity && this.inverter.id != "") {
          this.stockErrorMessage = "stock des onduleur insuffiante";
        } else {
          this.stockErrorMessage = "";
        }
        break;
      }
      case 'bat': {
        if (this.devis.battery.quantityBattery > this.battery.quantity && this.battery.id != "") {
          this.stockErrorMessage = "stock des batteries insuffiante";
        } else {
          this.stockErrorMessage = "";
        }
        break;
      }
      case 'sf': {
        if (this.devis.systemFixing.quantitySystemFixing > this.systemFixing.quantity && this.systemFixing.id != "") {
          this.stockErrorMessage = "stock des systèmes de fixation insuffiante";
        } else {
          this.stockErrorMessage = "";
        }
        break;
      }
      case 'm': {
        if (this.devis.meter.quantityMeter > this.meter.quantity && this.meter.id != "") {
          this.stockErrorMessage = "stock des compteurs insuffiante";
        } else {
          this.stockErrorMessage = "";
        }
        break;
      }
    }
  }

  public calculateTotal(quantity: number, price: number, tva: number, ele: string): number {
    let total: number = (quantity * price) + ((quantity * price) * tva / 100);
    switch (ele) {
      case 'sp': {
        this.devis.solarPanel.totalSolarPanel = total;
        break;
      }
      case 'in': {
        this.devis.inverter.totalInverter = total;
        break;
      }
      case 'bat': {
        this.devis.battery.totalBattery = total;
        break;
      }
      case 'sf': {
        this.devis.systemFixing.totalSystemFixing = total;
        break;
      }
      case 'met': {
        this.devis.meter.totalMeter = total;
        break;
      }
      case 'cable': {
        this.devis.cable.totalCable = total;
      }
    }
    return total;
  }

  public calculateTotalDevis(): number {
    let total = (this.devis.solarPanel.totalSolarPanel
      + this.devis.inverter.totalInverter
      + this.devis.battery.totalBattery
      + this.devis.systemFixing.totalSystemFixing
      + this.devis.meter.totalMeter)
    this.devis.total = total;
    return total
  }


  public getSolarPanels(pageNo: number): void {
    this.solarPanelService.getSolarPanels(pageNo, this.companyId).subscribe({
      next: (res) => {
        this.SolarPanelList = res.content
        this.solarPanelTotalPages = res.totalPages
      }
    })
  }

  public getInverters(pageNo: number): void {
    this.inverterService.getInverters(pageNo, this.companyId).subscribe({
      next: (res) => {
        this.InverterList = res.content
        this.inverterTotalPages = res.totalPages
      }
    })
  }

  public getBatteries(pageNo: number): void {
    this.batteryService.getBatteries(pageNo, this.companyId).subscribe({
      next: (res) => {
        this.BatteryList = res.content
        this.batteryTotalPages = res.totalPages
      }
    })
  }

  public getSystemFixings(pageNo: number): void {
    this.systemFixingService.getSystemFixing(pageNo, this.companyId).subscribe({
      next: (res) => {
        this.SystemFixingList = res.content
        this.systemFixingTotalPages = res.totalPages
      }
    })
  }

  public getCables(pageNo: number): void {
    this.cableService.getCables(pageNo, this.companyId).subscribe({
      next: (res) => {
        this.CableList = res.content;
        this.cableTotalPages = res.totalPages;
      }
    })
  }

  public getMeters(pageNo: number): void {
    this.meterService.getMeters(pageNo, this.companyId).subscribe({
      next: (res) => {
        this.MeterList = res.content;
        this.meterTotalPages = res.totalPages;
      }
    })
  }

  public nextPage(mt: string): void {
    switch (mt) {
      case 'sp': {
        if (this.pageNo < this.solarPanelTotalPages - 1) {
          this.pageNo += 1
          this.getSolarPanels(this.pageNo)
        } else {
          this.pageNo = 0
          this.getSolarPanels(this.pageNo)
        }
        break;
      }
      case 'inv': {
        if (this.pageNo < this.inverterTotalPages - 1) {
          this.pageNo += 1
          this.getInverters(this.pageNo)
        } else {
          this.pageNo = 0
          this.getInverters(this.pageNo)
        }
        break;
      }

      case 'bat': {
        if (this.pageNo < this.batteryTotalPages - 1) {
          this.pageNo += 1
          this.getBatteries(this.pageNo)
        } else {
          this.pageNo = 0
          this.getBatteries(this.pageNo)
        }
        break;
      }
      case 'sf': {
        if (this.pageNo < this.systemFixingTotalPages - 1) {
          this.pageNo += 1
          this.getSystemFixings(this.pageNo)
        } else {
          this.pageNo = 0
          this.getSystemFixings(this.pageNo)
        }
        break;
      }
      case 'c': {
        if (this.pageNo < this.cableTotalPages - 1) {
          this.pageNo += 1
          this.getCables(this.pageNo)
        } else {
          this.pageNo = 0
          this.getCables(this.pageNo)
        }
        break;
      }
      case 'm': {
        if (this.pageNo < this.meterTotalPages - 1) {
          this.pageNo += 1
          this.getMeters(this.pageNo)
        } else {
          this.pageNo = 0
          this.getMeters(this.pageNo)
        }
        break;
      }
    }
  }

  public previousPage(mt: string): void {
    switch (mt) {
      case 'sp': {
        if (this.pageNo > 0) {
          this.pageNo -= 1
          this.getSolarPanels(this.pageNo)
        } else {
          this.pageNo = this.solarPanelTotalPages - 1
          this.getSolarPanels(this.pageNo)
        }
        break;
      }
      case 'inv': {
        if (this.pageNo > 0) {
          this.pageNo -= 1
          this.getInverters(this.pageNo)
        } else {
          this.pageNo = this.inverterTotalPages - 1
          this.getInverters(this.pageNo)
        }
        break;
      }
      case 'bat': {
        if (this.pageNo > 0) {
          this.pageNo -= 1
          this.getBatteries(this.pageNo)
        } else {
          this.pageNo = this.batteryTotalPages - 1
          this.getBatteries(this.pageNo)
        }
        break;
      }
      case 'sf': {
        if (this.pageNo > 0) {
          this.pageNo -= 1
          this.getSystemFixings(this.pageNo)
        } else {
          this.pageNo = this.systemFixingTotalPages - 1;
          this.getSystemFixings(this.pageNo)
        }
        break;
      }
      case 'c': {
        if (this.pageNo > 0) {
          this.pageNo -= 1
          this.getCables(this.pageNo)
        } else {
          this.pageNo = this.cableTotalPages - 1;
          this.getCables(this.pageNo)
        }
        break;
      }
      case 'm': {
        if (this.pageNo > 0) {
          this.pageNo -= 1
          this.getMeters(this.pageNo)
        } else {
          this.pageNo = this.meterTotalPages - 1;
          this.getMeters(this.pageNo)
        }
        break;
      }
    }
  }

  ngOnInit() {
    this.devisRequest = JSON.parse(sessionStorage.getItem('devis-request') as any);
    this.companyId = sessionStorage.getItem('company') as string;
    this.getSolarPanels(0);
    this.getInverters(0);
    this.getBatteries(0);
    this.getSystemFixings(0);
    this.getCables(0);
    this.getMeters(0);
  }
}
