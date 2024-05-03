import {Component, OnInit} from '@angular/core';
import {InverterService} from "../../services/inverter/inverter.service";
import {Inverter} from "../../models/inverter";
import {ContactorService} from "../../services/contactor/contactor.service";
import {Contactor} from "../../models/Contactor";
import {Worker} from "../../models/Worker";
import {WorkerService} from "../../services/worker/worker.service";

@Component({
  selector: 'app-inverter',
  templateUrl: './inverter.component.html',
  styleUrls: ['./inverter.component.css']
})
export class InverterComponent implements OnInit {

  constructor(private inverterService: InverterService,
              private contactorService: ContactorService,
              private workerService: WorkerService) {
  }

  stock: number = 1000;
  stLevel: number = 0;
  quantity: number = 0;
  sh: string = "";
  inverterList: Array<Inverter> = []
  totalPages: number = 0;
  totalElements: number = 0;
  pageNo: number = 0;
  filteredData: boolean = false;
  inverter: Inverter = {
    id: "", type: "", company: {id: ""}, phase_number: 0, tension: 0, frequency: "", minimal_circuit_current: 0,
    maximum_circuit_voltage: 0, nominal_power: 0, quantity: 0, model: "", price: 0, image: ""
  }
  contactor: Contactor = {
    id: "", firstName: "", lastName: "", email: "", phone: "", address: "", company: {id: ""}
  }
  worker: Worker = {
    id: "", firstName: "", lastName: "", address: "", email: "", phone: "", profession: "", image: "", company: {id: ""}
  }

  public selectInverter(inverter: Inverter): void {
    this.inverter = inverter;
  }

  public stockLevel(): void {
    if (this.worker.company.id != "") {
      let companyId = this.worker.company.id
      this.inverterService.getInverterStockLevel(companyId).subscribe({
        next: (res) => {
          this.stLevel = res * 100 / this.stock
        }
      })
    } else {
      let companyId = this.contactor.company.id
      this.inverterService.getInverterStockLevel(companyId).subscribe({
        next: (res) => {
          this.stLevel = res * 100 / this.stock
        }
      })
    }
  }

  public nextPage(): void {
    if (this.pageNo < this.totalPages - 1) {
      this.pageNo += 1
      if (this.worker.company.id != "") {
        let companyId = this.worker.company.id
        if (!this.filteredData) {
          this.getInverterList(this.pageNo, companyId)
        } else {
          this.getInverterListFiltered(this.pageNo, companyId, this.sh)
        }
      } else {
        let companyId = this.contactor.company.id
        if (!this.filteredData) {
          this.getInverterList(this.pageNo, companyId)
        } else {
          this.getInverterListFiltered(this.pageNo, companyId, this.sh)
        }
      }
    } else {
      this.pageNo = 0
      if (this.worker.company.id != "") {
        let companyId = this.worker.company.id
        if (!this.filteredData) {
          this.getInverterList(this.pageNo, companyId)
        } else {
          this.getInverterListFiltered(this.pageNo, companyId, this.sh)
        }
      } else {
        let companyId = this.contactor.company.id
        if (!this.filteredData) {
          this.getInverterList(this.pageNo, companyId)
        } else {
          this.getInverterListFiltered(this.pageNo, companyId, this.sh)
        }
      }
    }
  }

  public previousPage(): void {
    if (this.pageNo > 0) {
      this.pageNo -= 1;
      if (this.worker.company.id != "") {
        let companyId = this.worker.company.id;
        if (!this.filteredData) {
          this.getInverterList(this.pageNo, companyId);
        } else {
          this.getInverterListFiltered(this.pageNo, companyId, this.sh);
        }
      } else {
        let companyId = this.contactor.company.id;
        if (!this.filteredData) {
          this.getInverterList(this.pageNo, companyId);
        } else {
          this.getInverterListFiltered(this.pageNo, companyId, this.sh);
        }
      }
    } else {
      this.pageNo = this.totalPages - 1;
      if (this.worker.company.id != "") {
        let companyId = this.worker.company.id;
        if (!this.filteredData) {
          this.getInverterList(this.pageNo, companyId);
        } else {
          this.getInverterListFiltered(this.pageNo, companyId, this.sh);
        }
      } else {
        let companyId = this.contactor.company.id;
        if (!this.filteredData) {
          this.getInverterList(this.pageNo, companyId);
        } else {
          this.getInverterListFiltered(this.pageNo, companyId, this.sh);
        }
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
            this.getInverterList(0, res.company.id)
            this.stockLevel()
          }
        })
        break;
      }
      case 'SECRETARE': {
        this.workerService.getWorkerByEmail(decodedToken.sub).subscribe({
          next: (res) => {
            this.worker = res
            this.getInverterList(0, res.company.id)
          }
        })
        break;
      }
    }
  }

  public search(): void {
    let user = sessionStorage.getItem('user')
    switch (user) {
      case 'ENTREPRENEUR': {
        this.getInverterListFiltered(0, this.contactor.company.id, this.sh);
        break;
      }
      case 'SECRETAIRE': {
        this.getInverterListFiltered(0, this.worker.company.id, this.sh);
        break;
      }
    }
  }

  public getInverterList(pageNo: number, id: any): void {
    this.inverterService.getInverters(pageNo, id).subscribe({
      next: (res) => {
        this.inverterList = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
      }
    })
  }

  public getImageUrl(base64String: string | undefined): string {
    return base64String ? `${base64String}` : ''; // Handle missing image
  }

  public getInverterListFiltered(pageNo: number, id: any, filter: string): void {
    this.inverterService.getInvertersFiltered(pageNo, id, filter).subscribe({
      next: (res) => {
        this.inverterList = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
      }
    })
  }

  public updateInverter(): void {
    this.inverterService.updateInverter(this.inverter).subscribe({
      error: (err) => {
        if (err.status === 200) {
          let user: string = sessionStorage.getItem('user') as string
          switch (user) {
            case 'ENTREPRENEUR': {
              this.getInverterList(0, this.contactor.company.id)
              this.stockLevel()
              break;
            }
            case 'SECRETARE': {
              this.getInverterList(0, this.worker.company?.id)
              this.stockLevel()
              break;
            }
          }
        }
      }
    })
  }

  public deleteInverter(): void {
    this.inverterService.deleteInverter(this.inverter.id).subscribe({
      error: (err) => {
        if (err.status === 200) {
          let user: string = sessionStorage.getItem('user') as string
          switch (user) {
            case 'ENTREPRENEUR': {
              this.getInverterList(0, this.contactor.company.id)
              this.stockLevel()
              break;
            }
            case 'SECRETARE': {
              this.getInverterList(0, this.worker.company?.id)
              this.stockLevel()
              break;
            }
          }
        }
      }
    })
  }

  ngOnInit() {
    this.getUserByEmail()
  }
}
