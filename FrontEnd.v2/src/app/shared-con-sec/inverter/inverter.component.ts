import {Component, OnInit} from '@angular/core';
import {InverterService} from "../../services/inverter/inverter.service";
import {Inverter} from "../../models/inverter";

@Component({
  selector: 'app-inverter',
  templateUrl: './inverter.component.html',
  styleUrls: ['./inverter.component.css']
})
export class InverterComponent implements OnInit {

  constructor(private inverterService: InverterService) {
  }

  message: string = "";
  stock: number = 1000;
  stLevel: number = 0;
  quantity: number = 0;
  sh: string = "";
  inverterList: Array<Inverter> = []
  totalPages: number = 0;
  totalElements: number = 0;
  pageNo: number = 0;
  filteredData: boolean = false;
  companyId: string = "";
  dataLoading: boolean = true;
  inverter: Inverter = {
    id: "", type: "", companyDto: {
      id: "", companyName: "", contactorDto: {
        id: "", firstName: "", lastName: "", address: "", email: "", phone: "",
        licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
      }, address: "", contact: ""
    }, phase_number: 0, tension: 0, frequency: "", minimal_circuit_current: 0,
    maximum_circuit_voltage: 0, nominal_power: 0, quantity: 0, model: "", price: 0, image: ""
  }

  public selectInverter(inverter: Inverter): void {
    this.inverter = inverter;
  }

  public stockLevel(): void {
    this.inverterService.getInverterStockLevel(this.companyId).subscribe({
      next: (res) => {
        this.stLevel = res * 100 / this.stock
      }
    })
  }

  public nextPage(): void {
    if (this.pageNo < this.totalPages - 1) {
      this.pageNo += 1
      if (!this.filteredData) {
        this.getInverterList(this.pageNo, this.companyId)
      } else {
        this.getInverterListFiltered(this.pageNo, this.companyId, this.sh)
      }
    } else {
      this.pageNo = 0
      if (!this.filteredData) {
        this.getInverterList(this.pageNo, this.companyId)
      } else {
        this.getInverterListFiltered(this.pageNo, this.companyId, this.sh)
      }
    }
  }

  public previousPage(): void {
    if (this.pageNo > 0) {
      this.pageNo -= 1;
      if (!this.filteredData) {
        this.getInverterList(this.pageNo, this.companyId)
      } else {
        this.getInverterListFiltered(this.pageNo, this.companyId, this.sh)
      }
    } else {
      this.pageNo = this.totalPages - 1;
      if (!this.filteredData) {
        this.getInverterList(this.pageNo, this.companyId)
      } else {
        this.getInverterListFiltered(this.pageNo, this.companyId, this.sh)
      }
    }
  }

  public plusQuantity(inverter: Inverter): void {
    this.inverter = inverter
    this.inverter.quantity += this.quantity
    this.updateInverter()
    this.quantity = 0
  }

  public minusQuantity(inverter: Inverter): void {
    this.inverter = inverter
    this.inverter.quantity -= this.quantity
    this.updateInverter()
    this.quantity = 0
  }

  public search(): void {
    this.getInverterListFiltered(0, this.companyId, this.sh);
  }

  public getInverterList(pageNo: number, id: any): void {
    this.dataLoading = true;
    this.inverterService.getInverters(pageNo, id).subscribe({
      next: (res) => {
        this.inverterList = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.dataLoading = false;
      }
    })
  }

  public getImageUrl(base64String: string | undefined): string {
    return base64String ? `${base64String}` : '';
  }

  public getInverterListFiltered(pageNo: number, id: any, filter: string): void {
    this.dataLoading = true;
    this.inverterService.getInvertersFiltered(pageNo, id, filter).subscribe({
      next: (res) => {
        this.inverterList = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.dataLoading = false;
      }
    })
  }

  public updateInverter(): void {
    this.inverterService.updateInverter(this.inverter).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.stockLevel();
        }
      }
    })
  }

  public deleteInverter(): void {
    this.inverterService.deleteInverter(this.inverter.id).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.getInverterList(0, this.companyId);
          this.stockLevel()
        }
      }
    })
  }

  ngOnInit() {
    this.companyId = sessionStorage.getItem('company') as string;
    if(sessionStorage.getItem('message') !== null){
      this.message = sessionStorage.getItem('message') as string;
      setTimeout(() => {
        this.message = ""
        sessionStorage.setItem('message', "")
      }, 5000);
    }
    this.getInverterList(0, this.companyId);
    this.stockLevel();
  }
}
