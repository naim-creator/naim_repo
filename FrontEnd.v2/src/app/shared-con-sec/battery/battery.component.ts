import {Component, OnInit} from '@angular/core';
import {BatteryService} from "../../services/battery/battery.service";
import {Battery} from "../../models/battery";

@Component({
  selector: 'app-battery',
  templateUrl: './battery.component.html',
  styleUrls: ['./battery.component.css']
})
export class BatteryComponent implements OnInit {
  constructor(private batteryService: BatteryService) {
  }

  stock: number = 1000;
  stLevel: number = 0;
  quantity: number = 0;
  sh: string = "";
  batteryList: Array<Battery> = []
  totalPages: number = 0;
  totalElements: number = 0;
  pageNo: number = 0;
  filteredData: boolean = false;
  companyId: string = ""
  dataLoading: boolean = true;
  
  battery: Battery = {
    id: "", type: "", company: {id: ""}, quantity: 0, image: "", price: 0, model: "", date_manufacture: "",
    storage_capacity: 0, operating_temperature: 0, nominal_voltage: 0, life_cycle: "", maximum_load_voltage: 0,
    lifespan: "", maximum_discharge_voltage: 0
  }

  public selectBattery(battery: Battery): void {
    this.battery = battery;
  }

  public stockLevel(): void {
    this.batteryService.getBatteriesStockLevel(this.companyId).subscribe({
      next: (res) => {
        this.stLevel = res * 100 / this.stock
      }
    })
  }

  public nextPage(): void {
    if (this.pageNo < this.totalPages - 1) {
      this.pageNo += 1
      if (!this.filteredData) {
        this.getBatteryList(this.pageNo, this.companyId)
      } else {
        this.getBatteryListFiltered(this.pageNo, this.companyId, this.sh)
      }
    } else {
      this.pageNo = 0
      if (!this.filteredData) {
        this.getBatteryList(this.pageNo, this.companyId)
      } else {
        this.getBatteryListFiltered(this.pageNo, this.companyId, this.sh)
      }
    }
  }

  public previousPage(): void {
    if (this.pageNo > 0) {
      this.pageNo -= 1;
      if (!this.filteredData) {
        this.getBatteryList(this.pageNo, this.companyId)
      } else {
        this.getBatteryListFiltered(this.pageNo, this.companyId, this.sh)
      }
    } else {
      this.pageNo = this.totalPages - 1;
      if (!this.filteredData) {
        this.getBatteryList(this.pageNo, this.companyId)
      } else {
        this.getBatteryListFiltered(this.pageNo, this.companyId, this.sh)
      }
    }
  }

  public plusQuantity(battery: Battery): void {
    this.battery = battery;
    this.battery.quantity += this.quantity;
    this.updateBattery();
    this.quantity = 0;
  }

  public minusQuantity(battery: Battery): void {
    this.battery = battery;
    this.battery.quantity -= this.quantity;
    this.updateBattery();
    this.quantity = 0;
  }

  public search(): void {
    this.getBatteryListFiltered(0, this.companyId, this.sh);
  }

  public getBatteryList(pageNo: number, id: any): void {
    this.dataLoading = true;
    this.batteryService.getBatteries(pageNo, id).subscribe({
      next: (res) => {
        this.batteryList = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.dataLoading = false;
      }
    })
  }

  public getBatteryListFiltered(pageNo: number, id: any, filter: string): void {
    this.batteryService.getBatteriesFiltered(pageNo, id, filter).subscribe({
      next: (res) => {
        this.batteryList = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
      }
    })
  }

  public updateBattery(): void {
    this.batteryService.updateBattery(this.battery).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.stockLevel();
        }
      }
    })
  }

  public deleteBattery(): void {
    this.batteryService.deleteBattery(this.battery.id).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.getBatteryList(0, this.companyId);
        }
      }
    })
  }

  public getImageUrl(base64String: string | undefined): string {
    return base64String ? `${base64String}` : ''; // Handle missing image
  }

  ngOnInit() {
    this.companyId = sessionStorage.getItem('company') as string;
    this.getBatteryList(0, this.companyId);
    this.stockLevel();
  }
}
