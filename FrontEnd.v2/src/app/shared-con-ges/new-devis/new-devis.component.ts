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

@Component({
  selector: 'app-new-devis',
  templateUrl: './new-devis.component.html',
  styleUrls: ['./new-devis.component.css']
})
export class NewDevisComponent implements OnInit {

  constructor(private sharedDataService: SharedDataService,
              private solarPanelService: SolarPanelService) {
  }

  devisRequest: DevisRequest = {
    firstName: "", lastName: "", email: "", phone: "", building_type: "", location: "", post_code: "",
    roof_type: "", consumption: 0, electricity_access: false, available_area: 0, company: {id: ""}, status: "en attente"
  }
  solarPanel: SolarPanel = {
    id: "", price: 0, model: "", type_cell: "", weight: 0, height: 0, width: 0, company: {id: ""}, maximum_voltage: 0,
    maximum_current: 0, quantity: 0, nominal_power: 0, image: ""
  }
  SolarPanelList: any[] = []
  SystemFixingList: any[] = []
  InverterList: any[] = []
  MeterList: any[] = []
  CableList: any[] = []
  BatteryList: any[] = []
  Tva: any = [0, 5, 10, 15]
  pageNo: number = 0
  worker: Worker = this.sharedDataService.worker
  contactor: Contactor = this.sharedDataService.contactor
  solarPanelTotalPages: number = 0
  stockErrorMessage: string = ""
  chooseSolarPanel: string = "choisir un panneau  solaire"
  devis: Devis = {
    id: 0, date: "", ref: "", status: "",
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

  public selectSolarPanel(sp: SolarPanel): void {
    this.devis.solarPanel.priceSolarPanel = sp.price
    this.devis.solarPanel.modelSolarPanel = sp.model
    this.chooseSolarPanel = sp.model
    this.solarPanel = sp
  }

  public selectInverter(inv: Inverter): void {

  }

  public selectBattery(bt: Battery): void {

  }

  public selectMeter(mt: Meter): void {

  }

  public selectCable(c: Cable): void {

  }

  public selectSysTemFixing(sf: SystemFixing): void {

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
    }
  }

  public calculateTotal(quantity: number, price: number, tva: number, ele: string): number {
    let total: number = (quantity * price) + ((quantity * price) * tva / 100)
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
    return total
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
    if (this.worker.company.id != "") {
      this.solarPanelService.getSolarPanels(pageNo, this.worker.company.id).subscribe({
        next: (res) => {
          this.SolarPanelList = res.content
          this.solarPanelTotalPages = res.totalPages
        }
      })
    } else {
      this.solarPanelService.getSolarPanels(pageNo, this.contactor.company.id).subscribe({
        next: (res) => {
          this.SolarPanelList = res.content
          this.solarPanelTotalPages = res.totalPages
        }
      })
    }
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
    }
  }

  ngOnInit() {
    this.devisRequest = this.sharedDataService.devisRequest
    this.worker = this.sharedDataService.worker
    this.contactor = this.sharedDataService.contactor
    this.getSolarPanels(0)
  }
}
