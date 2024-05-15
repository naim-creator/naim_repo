import {Component, OnInit} from '@angular/core';
import {SystemFixingService} from "../../services/system-fixing/system-fixing.service";
import {SystemFixing} from "../../models/system-fixing";

@Component({
  selector: 'app-system-fixing',
  templateUrl: './system-fixing.component.html',
  styleUrls: ['./system-fixing.component.css']
})
export class SystemFixingComponent implements OnInit {
  constructor(private systemFixingService: SystemFixingService) {
  }

  message: string = "";
  stock: number = 1000;
  stLevel: number = 0;
  quantity: number = 0;
  sh: string = "";
  systemFixingList: Array<SystemFixing> = [];
  totalPages: number = 0;
  totalElements: number = 0;
  pageNo: number = 0;
  filteredData: boolean = false;
  companyId: string = ""
  dataLoading: boolean = true;
  systemFixing: SystemFixing = {
    id: 0, companyDto: {
      id: "", companyName: "", contactorDto: {
        id: "", firstName: "", lastName: "", address: "", email: "", phone: "",
        licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
      }, address: "", contact: ""
    }, quantity: 0, charge: 0, image: "", type: "", installation_method: "", materiel: "",
    model: "", adaptability: "", height: 0, price: 0, width: 0
  }

  public stockLevel(): void {
    this.systemFixingService.getSystemFixingStockLevel(this.companyId).subscribe({
      next: (res) => {
        this.stLevel = res * 100 / this.stock
      }
    })
  }

  public selectSystemFixing(systemFixing: SystemFixing): void {
    this.systemFixing = systemFixing;
  }

  public nextPage(): void {
    if (this.pageNo < this.totalPages - 1) {
      this.pageNo += 1
      if (!this.filteredData) {
        this.getSystemFixingList(this.pageNo, this.companyId)
      } else {
        this.getSystemFixingListFiltered(this.pageNo, this.companyId)
      }
    } else {
      this.pageNo = 0
      if (!this.filteredData) {
        this.getSystemFixingList(this.pageNo, this.companyId)
      } else {
        this.getSystemFixingListFiltered(this.pageNo, this.companyId)
      }
    }
  }

  public previousPage(): void {
    if (this.pageNo > 0) {
      this.pageNo -= 1
      if (!this.filteredData) {
        this.getSystemFixingList(this.pageNo, this.companyId)
      } else {
        this.getSystemFixingListFiltered(this.pageNo, this.companyId)
      }
    } else {
      this.pageNo = this.totalPages - 1
      if (!this.filteredData) {
        this.getSystemFixingList(this.pageNo, this.companyId)
      } else {
        this.getSystemFixingListFiltered(this.pageNo, this.companyId)
      }
    }
  }

  public plusQuantity(systemFixing: SystemFixing): void {
    this.systemFixing = systemFixing
    this.systemFixing.quantity += this.quantity
    this.updateSystemFixing()
    this.quantity = 0
  }

  public minusQuantity(systemFixing: SystemFixing): void {
    this.systemFixing = systemFixing
    this.systemFixing.quantity -= this.quantity
    this.updateSystemFixing()
    this.quantity = 0
  }

  public getSystemFixingList(pageNo: number, id: any): void {
    this.dataLoading = true;
    this.systemFixingService.getSystemFixing(pageNo, id).subscribe({
      next: (res) => {
        this.systemFixingList = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.dataLoading = false;
      }
    })
  }

  public getSystemFixingListFiltered(pageNo: number, id: any): void {
    this.dataLoading = true;
    this.systemFixingService.getSystemFixingFiltered(pageNo, id, this.sh).subscribe({
      next: (res) => {
        this.systemFixingList = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.filteredData = res.totalElements != 0;
        this.dataLoading = false;
      }
    })
  }

  public search(): void {
    this.getSystemFixingListFiltered(0, this.companyId);
  }

  public getImageUrl(base64String: string | undefined): string {
    return base64String ? `${base64String}` : ''; // Handle missing image
  }

  public updateSystemFixing(): void {
    this.systemFixingService.updateSystemFixing(this.systemFixing).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.stockLevel()
        }
      }
    })
  }

  public deleteSystemFixing(): void {
    this.systemFixingService.deleteSystemFixing(this.systemFixing.id).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.getSystemFixingList(0, this.companyId);
          this.stockLevel();
        }
      }
    })
  }

  ngOnInit() {
    this.companyId = sessionStorage.getItem('company') as string;
    if (sessionStorage.getItem('message') !== null) {
      this.message = sessionStorage.getItem('message') as string;
      setTimeout(() => {
        this.message = ""
        sessionStorage.setItem('message', "")
      }, 5000);
    }
    this.getSystemFixingList(0, this.companyId);
    this.stockLevel();
  }
}
