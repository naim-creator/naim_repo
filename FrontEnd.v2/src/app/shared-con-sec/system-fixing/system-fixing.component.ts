import {Component, OnInit} from '@angular/core';
import {SolarPanelService} from "../../services/solar-panel/solar-panel.service";
import {ContactorService} from "../../services/contactor/contactor.service";
import {WorkerService} from "../../services/worker/worker.service";
import {SolarPanel} from "../../models/solar-panel";
import {Contactor} from "../../models/Contactor";
import {Worker} from "../../models/Worker";
import {SystemFixingService} from "../../services/system-fixing/system-fixing.service";
import {SystemFixing} from "../../models/system-fixing";

@Component({
  selector: 'app-system-fixing',
  templateUrl: './system-fixing.component.html',
  styleUrls: ['./system-fixing.component.css']
})
export class SystemFixingComponent implements OnInit {
  constructor(private systemFixingService: SystemFixingService,
              private contactorService: ContactorService,
              private workerService: WorkerService) {
  }

  stock: number = 1000;
  stLevel: number = 0;
  quantity: number = 0;
  sh: string = "";
  systemFixingList: Array<SystemFixing> = [];
  totalPages: number = 0;
  totalElements: number = 0;
  pageNo: number = 0;
  filteredData: boolean = false;
  contactor: Contactor = {
    id: "", firstName: "", lastName: "", email: "", phone: "", address: "", company: {id: ""}
  }
  worker: Worker = {
    id: "", firstName: "", lastName: "", address: "", email: "", phone: "", profession: "", image: "", company: {id: ""}
  }
  systemFixing: SystemFixing = {
    id: 0, company: {id: ""}, quantity: 0, charge: 0, image: "", type: "", installation_method: "", materiel: "",
    model: "", adaptability: "", height: 0, price: 0, width: 0
  }

  public stockLevel(): void {
    if (this.worker.company.id != "") {
      let companyId = this.worker.company.id
      this.systemFixingService.getSystemFixingStockLevel(companyId).subscribe({
        next: (res) => {
          this.stLevel = res * 100 / this.stock
        }
      })
    } else {
      let companyId = this.contactor.company.id
      this.systemFixingService.getSystemFixingStockLevel(companyId).subscribe({
        next: (res) => {
          this.stLevel = res * 100 / this.stock
        }
      })
    }
  }

  public selectSystemFixing(systemFixing: SystemFixing): void {
    this.systemFixing = systemFixing;
  }

  public nextPage(): void {
    if (this.pageNo < this.totalPages - 1) {
      this.pageNo += 1
      if (this.worker.company.id != "") {
        let companyId = this.worker.company.id
        if (!this.filteredData) {
          this.getSystemFixingList(this.pageNo, companyId)
        } else {
          this.getSystemFixingListFiltered(this.pageNo, companyId)
        }
      } else {
        let companyId = this.contactor.company.id
        if (!this.filteredData) {
          this.getSystemFixingList(this.pageNo, companyId)
        } else {
          this.getSystemFixingListFiltered(this.pageNo, companyId)
        }
      }
    } else {
      this.pageNo = 0
      if (this.worker.company.id != "") {
        let companyId = this.worker.company.id
        if (!this.filteredData) {
          this.getSystemFixingList(this.pageNo, companyId)
        } else {
          this.getSystemFixingListFiltered(this.pageNo, companyId)
        }
      } else {
        let companyId = this.contactor.company.id
        if (!this.filteredData) {
          this.getSystemFixingList(this.pageNo, companyId)
        } else {
          this.getSystemFixingListFiltered(this.pageNo, companyId)
        }
      }
    }
  }

  public previousPage(): void {
    if (this.pageNo > 0) {
      this.pageNo -= 1
      if (this.worker.company.id != "") {
        let companyId = this.worker.company.id
        if (!this.filteredData) {
          this.getSystemFixingList(this.pageNo, companyId)
        } else {
          this.getSystemFixingListFiltered(this.pageNo, companyId)
        }
      } else {
        let companyId = this.contactor.company.id
        if (!this.filteredData) {
          this.getSystemFixingList(this.pageNo, companyId)
        } else {
          this.getSystemFixingListFiltered(this.pageNo, companyId)
        }
      }
    } else {
      this.pageNo = this.totalPages - 1
      if (this.worker.company.id != "") {
        let companyId = this.worker.company.id
        if (!this.filteredData) {
          this.getSystemFixingList(this.pageNo, companyId)
        } else {
          this.getSystemFixingListFiltered(this.pageNo, companyId)
        }
      } else {
        let companyId = this.contactor.company.id
        if (!this.filteredData) {
          this.getSystemFixingList(this.pageNo, companyId)
        } else {
          this.getSystemFixingListFiltered(this.pageNo, companyId)
        }
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
    this.systemFixingService.getSystemFixing(pageNo, id).subscribe({
      next: (res) => {
        this.systemFixingList = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
      }
    })
  }

  public getSystemFixingListFiltered(pageNo: number, id: any): void {
    this.systemFixingService.getSystemFixingFiltered(pageNo, id, this.sh).subscribe({
      next: (res) => {
        this.systemFixingList = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        if (res.totalElements != 0) {
          this.filteredData = true;
        } else {
          this.filteredData = false;
        }
      }
    })
  }

  public search(): void {
    let user = sessionStorage.getItem('user')
    switch (user) {
      case 'ENTREPRENEUR': {
        this.getSystemFixingListFiltered(0, this.contactor.company.id);
        break;
      }
      case 'SECRETAIRE': {
        this.getSystemFixingListFiltered(0, this.worker.company.id);
        break;
      }
    }
  }

  public getUserByEmail(): void {
    let user: string = sessionStorage.getItem('user') as string
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
    switch (user) {
      case 'ENTREPRENEUR': {
        this.contactorService.getContactorByEmail(decodedToken.sub).subscribe({
          next: (res) => {
            this.contactor = res
            this.getSystemFixingList(0, res.company.id)
            this.stockLevel()
          }
        })
        break;
      }
      case 'SECRETARE': {
        this.workerService.getWorkerByEmail(decodedToken.sub).subscribe({
          next: (res) => {
            this.worker = res
            this.getSystemFixingList(0, res.company.id)
          }
        })
        break;
      }
    }
  }

  public getImageUrl(base64String: string | undefined): string {
    return base64String ? `${base64String}` : ''; // Handle missing image
  }

  public updateSystemFixing(): void {
    this.systemFixingService.updateSystemFixing(this.systemFixing).subscribe({
      error: (err) => {
        if (err.status === 200) {
          let user: string = sessionStorage.getItem('user') as string
          switch (user) {
            case 'ENTREPRENEUR': {
              this.getSystemFixingList(0, this.contactor.company.id)
              this.stockLevel()
              break;
            }
            case 'SECRETARE': {
              this.getSystemFixingList(0, this.worker.company?.id)
              this.stockLevel()
              break;
            }
          }
        }
      }
    })
  }

  public deleteSystemFixing(): void {
    this.systemFixingService.deleteSystemFixing(this.systemFixing.id).subscribe({
      error: (err) => {
        if (err.status === 200) {
          let user: string = sessionStorage.getItem('user') as string
          switch (user) {
            case 'ENTREPRENEUR': {
              this.getSystemFixingList(0, this.contactor.company.id)
              break;
            }
            case 'SECRETARE': {
              this.getSystemFixingList(0, this.worker.company?.id)
              break;
            }
          }
        }
      }
    })
  }

  ngOnInit() {
    this.getUserByEmail();
  }
}
