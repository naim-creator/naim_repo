import {Component, OnInit} from '@angular/core';
import {SolarPanelService} from "../../services/solar-panel/solar-panel.service";
import {SolarPanel} from "../../models/solar-panel";
import {ContactorService} from "../../services/contactor/contactor.service";
import {WorkerService} from "../../services/worker/worker.service";
import {Contactor} from "../../models/Contactor";
import {Worker} from "../../models/Worker";
import {min} from "rxjs";

@Component({
  selector: 'app-solar-panel',
  templateUrl: './solar-panel.component.html',
  styleUrls: ['./solar-panel.component.css']
})
export class SolarPanelComponent implements OnInit {

  constructor(private solarPanelService: SolarPanelService,
              private contactorService: ContactorService,
              private workerService: WorkerService) {
  }

  stock: number = 1000;
  stLevel: number = 0;
  quantity: number = 0;
  sh: string = "";
  solarPanelList: Array<SolarPanel> = [];
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
  solarPanel: SolarPanel = {
    id: 0, company: {id: ""}, quantity: 0, type_cell: "", image: "", weight: 0, maximum_current: 0, maximum_voltage: 0,
    model: "", nominal_power: 0, width: 0, price: 0, height: 0
  }

  public stockLevel(): void {
    if (this.worker.company.id != "") {
      let companyId = this.worker.company.id
      this.solarPanelService.getSolarPanelStockLevel(companyId).subscribe({
        next: (res) => {
          this.stLevel = res * 100 / this.stock
        }
      })
    } else {
      let companyId = this.contactor.company.id
      this.solarPanelService.getSolarPanelStockLevel(companyId).subscribe({
        next: (res) => {
          this.stLevel = res * 100 / this.stock
        }
      })
    }
  }

  public selectSolarPanel(solarPanel: SolarPanel): void {
    this.solarPanel = solarPanel;
  }

  public nextPage(): void {
    if (this.pageNo < this.totalPages - 1) {
      this.pageNo += 1
      if (this.worker.company.id != "") {
        let companyId = this.worker.company.id
        if (!this.filteredData) {
          this.getSolarPanles(this.pageNo, companyId)
        } else {
          this.getSolarPanlesFiltered(this.pageNo, companyId)
        }
      } else {
        let companyId = this.contactor.company.id
        if (!this.filteredData) {
          this.getSolarPanles(this.pageNo, companyId)
        } else {
          this.getSolarPanlesFiltered(this.pageNo, companyId)
        }
      }
    } else {
      this.pageNo = 0
      if (this.worker.company.id != "") {
        let companyId = this.worker.company.id
        if (!this.filteredData) {
          this.getSolarPanles(this.pageNo, companyId)
        } else {
          this.getSolarPanlesFiltered(this.pageNo, companyId)
        }
      } else {
        let companyId = this.contactor.company.id
        if (!this.filteredData) {
          this.getSolarPanles(this.pageNo, companyId)
        } else {
          this.getSolarPanlesFiltered(this.pageNo, companyId)
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
          this.getSolarPanles(this.pageNo, companyId)
        } else {
          this.getSolarPanlesFiltered(this.pageNo, companyId)
        }
      } else {
        let companyId = this.contactor.company.id
        if (!this.filteredData) {
          this.getSolarPanles(this.pageNo, companyId)
        } else {
          this.getSolarPanlesFiltered(this.pageNo, companyId)
        }
      }
    } else {
      this.pageNo = this.totalPages - 1
      if (this.worker.company.id != "") {
        let companyId = this.worker.company.id
        if (!this.filteredData) {
          this.getSolarPanles(this.pageNo, companyId)
        } else {
          this.getSolarPanlesFiltered(this.pageNo, companyId)
        }
      } else {
        let companyId = this.contactor.company.id
        if (!this.filteredData) {
          this.getSolarPanles(this.pageNo, companyId)
        } else {
          this.getSolarPanlesFiltered(this.pageNo, companyId)
        }
      }
    }
  }

  public plusQuantity(solarPanel: SolarPanel): void {
    this.solarPanel = solarPanel
    this.solarPanel.quantity += this.quantity
    this.updateSolarPanel()
    this.quantity = 0
  }

  public minusQuantity(solarPanel: SolarPanel): void {
    this.solarPanel = solarPanel
    this.solarPanel.quantity -= this.quantity
    this.updateSolarPanel()
    this.quantity = 0
  }

  public getSolarPanles(pageNo: number, id: any): void {
    this.solarPanelService.getSolarPanels(pageNo, id).subscribe({
      next: (res) => {
        this.solarPanelList = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
      }
    })
  }

  public getSolarPanlesFiltered(pageNo: number, id: any): void {
    this.solarPanelService.getSolarPanelsFiltered(pageNo, id, this.sh).subscribe({
      next: (res) => {
        this.solarPanelList = res.content;
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
        this.getSolarPanlesFiltered(0, this.contactor.company.id);
        break;
      }
      case 'SECRETAIRE': {
        this.getSolarPanlesFiltered(0, this.worker.company.id);
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
            this.getSolarPanles(0, res.company.id)
            this.stockLevel()
          }
        })
        break;
      }
      case 'SECRETARE': {
        this.workerService.getWorkerByEmail(decodedToken.sub).subscribe({
          next: (res) => {
            this.worker = res
            this.getSolarPanles(0, res.company.id)
          }
        })
        break;
      }
    }
  }

  public getImageUrl(base64String: string | undefined): string {
    return base64String ? `${base64String}` : ''; // Handle missing image
  }

  public updateSolarPanel(): void {
    this.solarPanelService.updateSolarPanels(this.solarPanel).subscribe({
      error: (err) => {
        if (err.status === 200) {
          let user: string = sessionStorage.getItem('user') as string
          switch (user) {
            case 'ENTREPRENEUR': {
              this.getSolarPanles(0, this.contactor.company.id)
              this.stockLevel()
              break;
            }
            case 'SECRETARE': {
              this.getSolarPanles(0, this.worker.company?.id)
              this.stockLevel()
              break;
            }
          }
        }
      }
    })
  }

  public deleteSolarPanel(): void {
    this.solarPanelService.deleteSolarPanels(this.solarPanel.id).subscribe({
      error: (err) => {
        if (err.status === 200) {
          let user: string = sessionStorage.getItem('user') as string
          switch (user) {
            case 'ENTREPRENEUR': {
              this.getSolarPanles(0, this.contactor.company.id)
              break;
            }
            case 'SECRETARE': {
              this.getSolarPanles(0, this.worker.company?.id)
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
