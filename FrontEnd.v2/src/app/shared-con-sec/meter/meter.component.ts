import {Component, OnInit} from '@angular/core';
import {Meter} from "../../models/meter";
import {MeterService} from "../../services/meter/meter.service";

@Component({
  selector: 'app-meter',
  templateUrl: './meter.component.html',
  styleUrls: ['./meter.component.css']
})
export class MeterComponent implements OnInit {
  constructor(private meterService: MeterService) {
  }

  stock: number = 1000;
  stLevel: number = 0;
  quantity: number = 0;
  sh: string = "";
  meterList: Array<Meter> = []
  totalPages: number = 0;
  totalElements: number = 0;
  pageNo: number = 0;
  filteredData: boolean = false;
  companyId: string = "";
  dataLoading: boolean = true;
  meter: Meter = {
    id: "", model: "", connexion_type: "", image: "", price: 0, quantity: 0, type: "",
    company: {id: ""}, capacity: 0
  }

  public selectMeter(meter: Meter): void {
    this.meter = meter;
  }

  public stockLevel(): void {
    this.meterService.getMetersStockLevel(this.companyId).subscribe({
      next: (res) => {
        this.stLevel = res * 100 / this.stock
      }
    })
  }

  public nextPage(): void {
    if (this.pageNo < this.totalPages - 1) {
      this.pageNo += 1
      if (!this.filteredData) {
        this.getMeterList(this.pageNo, this.companyId)
      } else {
        this.getMeterListFiltered(this.pageNo, this.companyId, this.sh)
      }
    } else {
      this.pageNo = 0
      if (!this.filteredData) {
        this.getMeterList(this.pageNo, this.companyId)
      } else {
        this.getMeterListFiltered(this.pageNo, this.companyId, this.sh)
      }
    }
  }

  public previousPage(): void {
    if (this.pageNo > 0) {
      this.pageNo -= 1;
      if (!this.filteredData) {
        this.getMeterList(this.pageNo, this.companyId)
      } else {
        this.getMeterListFiltered(this.pageNo, this.companyId, this.sh)
      }
    } else {
      this.pageNo = this.totalPages - 1;
      if (!this.filteredData) {
        this.getMeterList(this.pageNo, this.companyId)
      } else {
        this.getMeterListFiltered(this.pageNo, this.companyId, this.sh)
      }
    }
  }

  public plusQuantity(meter: Meter): void {
    this.meter = meter;
    this.meter.quantity += this.quantity;
    this.updateMeter();
    this.quantity = 0;
  }

  public minusQuantity(meter: Meter): void {
    this.meter = meter;
    this.meter.quantity -= this.quantity;
    this.updateMeter();
    this.quantity = 0;
  }

  public search(): void {
    this.getMeterListFiltered(0, this.companyId, this.sh);
  }

  public getMeterList(pageNo: number, id: any): void {
    this.dataLoading = true
    this.meterService.getMeters(
      pageNo, id).subscribe({
      next: (res) => {
        this.meterList = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.dataLoading = false;
      }
    })
  }

  public getMeterListFiltered(pageNo: number, id: any, filter: string): void {
    this.dataLoading = true
    this.meterService.getMetersFiltered(pageNo, id, filter).subscribe({
      next: (res) => {
        this.meterList = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.dataLoading = false;
      }
    })
  }

  public updateMeter(): void {
    this.meterService.updateMeter(this.meter).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.stockLevel();
        }
      }
    })
  }

  public deleteMeter(): void {
    this.meterService.deleteMeter(this.meter.id).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.getMeterList(0, this.companyId);
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
    this.getMeterList(0, this.companyId);
    this.stockLevel();
  }

}
