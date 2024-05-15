import {Component, OnInit} from '@angular/core';
import {CableService} from "../../services/cable/cable.service";
import {Cable} from "../../models/cable";

@Component({
  selector: 'app-cable',
  templateUrl: './cable.component.html',
  styleUrls: ['./cable.component.css']
})
export class CableComponent implements OnInit {

  constructor(private cableService: CableService) {
  }

  stock: number = 1000;
  stLevel: number = 0;
  quantity: number = 0;
  sh: string = "";
  cableList: Array<Cable> = []
  totalPages: number = 0;
  totalElements: number = 0;
  pageNo: number = 0;
  filteredData: boolean = false;
  dataLoading: boolean = true;
  companyId: string = "";
  cable: Cable = {
    type: "", companyDto: {
      id: "", companyName: "", contactorDto: {
        id: "", firstName: "", lastName: "", address: "", email: "", phone: "",
        licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
      }, address: "", contact: ""
    }, model: "", section_transversal: "", image: "", price: 0, quantity: 0,
    material: "", isolation: "", diameter: 0, length: 0, resistance: 0, nominal_voltage: 0
  }

  public selectCable(cable: Cable): void {
    this.cable = cable;
  }

  public stockLevel(): void {
    this.cableService.getCablesStockLevel(this.companyId).subscribe({
      next: (res) => {
        this.stLevel = res * 100 / this.stock
      }
    })
  }

  public nextPage(): void {
    if (this.pageNo < this.totalPages - 1) {
      this.pageNo += 1
      if (!this.filteredData) {
        this.getCableList(this.pageNo, this.companyId)
      } else {
        this.getCableListFiltered(this.pageNo, this.companyId, this.sh)
      }
    } else {
      this.pageNo = 0
      if (!this.filteredData) {
        this.getCableList(this.pageNo, this.companyId)
      } else {
        this.getCableListFiltered(this.pageNo, this.companyId, this.sh)
      }
    }
  }

  public previousPage(): void {
    if (this.pageNo > 0) {
      this.pageNo -= 1;
      if (!this.filteredData) {
        this.getCableList(this.pageNo, this.companyId)
      } else {
        this.getCableListFiltered(this.pageNo, this.companyId, this.sh)
      }
    } else {
      this.pageNo = this.totalPages - 1;
      if (!this.filteredData) {
        this.getCableList(this.pageNo, this.companyId)
      } else {
        this.getCableListFiltered(this.pageNo, this.companyId, this.sh)
      }
    }
  }

  public plusQuantity(cable: Cable): void {
    this.cable = cable;
    this.cable.quantity += this.quantity;
    this.updateCable();
    this.quantity = 0;
  }

  public minusQuantity(cable: Cable): void {
    this.cable = cable;
    this.cable.quantity -= this.quantity;
    this.updateCable();
    this.quantity = 0;
  }

  public search(): void {
    this.getCableListFiltered(0, this.companyId, this.sh);
  }

  public getCableList(pageNo: number, id: any): void {
    this.dataLoading = true;
    this.cableService.getCables(pageNo, id).subscribe({
      next: (res) => {
        this.cableList = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.dataLoading = false;
      }
    })
  }

  public getCableListFiltered(pageNo: number, id: any, filter: string): void {
    this.dataLoading = true;
    this.cableService.getCablesFiltered(pageNo, id, filter).subscribe({
      next: (res) => {
        this.cableList = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.dataLoading = false;
      }
    })
  }

  public updateCable(): void {
    this.cableService.updateCable(this.cable).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.stockLevel();
        }
      }
    })
  }

  public deleteCable(): void {
    this.cableService.deleteCable(this.cable.id).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.getCableList(0, this.companyId);
          this.stockLevel();
        }
      }
    })
  }

  public getImageUrl(base64String: string | undefined): string {
    return base64String ? `${base64String}` : '';
  }

  ngOnInit() {
    this.companyId = sessionStorage.getItem('company') as string;
    this.getCableList(0, this.companyId);
    this.stockLevel();
  }
}
