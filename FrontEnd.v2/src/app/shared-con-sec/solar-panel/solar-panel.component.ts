import {Component, OnInit} from '@angular/core';
import {SolarPanelService} from "../../services/solar-panel/solar-panel.service";
import {SolarPanel} from "../../models/solar-panel";
import {Company} from "../../models/Company";

@Component({
  selector: 'app-solar-panel',
  templateUrl: './solar-panel.component.html',
  styleUrls: ['./solar-panel.component.css']
})
export class SolarPanelComponent implements OnInit {

  constructor(private solarPanelService: SolarPanelService) {
  }

  companyDto: Company = {
    id: "", companyName: "", address: "", contact: "", contactorDto: {
      id: "", licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""},
      phone: "", email: "", address: "", lastName: "", firstName: ""
    }
  }
  message: string = ""
  stock: number = 1000;
  stLevel: number = 0;
  quantity: number = 0;
  sh: string = "";
  solarPanelList: Array<SolarPanel> = [];
  totalPages: number = 0;
  totalElements: number = 0;
  pageNo: number = 0;
  filteredData: boolean = false;
  dataLoading: boolean = true;
  dataExist: boolean = true;
  solarPanel: SolarPanel = {
    id: 0, companyDto: {
      id: "", companyName: "", contactorDto: {
        id: "", firstName: "", lastName: "", address: "", email: "", phone: "",
        licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
      }, address: "", contact: ""
    }, quantity: 0, type_cell: "", image: "", weight: 0, maximum_current: 0, maximum_voltage: 0,
    model: "", nominal_power: 0, width: 0, price: 0, height: 0
  }

  public stockLevel(): void {
    this.solarPanelService.getSolarPanelStockLevel(this.companyDto.id).subscribe({
      next: (res) => {
        this.stLevel = res * 100 / this.stock
      }
    })
  }

  public selectSolarPanel(solarPanel: SolarPanel): void {
    this.solarPanel = solarPanel;
  }

  public nextPage(): void {
    if (this.pageNo < this.totalPages - 1) {
      this.pageNo += 1
      if (!this.filteredData) {
        this.getSolarPanels(this.pageNo, this.companyDto.id)
      } else {
        this.getSolarPanelsFiltered(this.pageNo, this.companyDto.id)
      }
    } else {
      this.pageNo = 0
      if (!this.filteredData) {
        this.getSolarPanels(this.pageNo, this.companyDto.id)
      } else {
        this.getSolarPanelsFiltered(this.pageNo, this.companyDto.id)
      }
    }
  }

  public previousPage(): void {
    if (this.pageNo > 0) {
      this.pageNo -= 1
      if (!this.filteredData) {
        this.getSolarPanels(this.pageNo, this.companyDto.id)
      } else {
        this.getSolarPanelsFiltered(this.pageNo, this.companyDto.id)
      }
    } else {
      this.pageNo = this.totalPages - 1
      if (!this.filteredData) {
        this.getSolarPanels(this.pageNo, this.companyDto.id)
      } else {
        this.getSolarPanelsFiltered(this.pageNo, this.companyDto.id)
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

  public getSolarPanels(pageNo: number, id: any): void {
    this.dataLoading = true
    this.solarPanelService.getSolarPanels(pageNo, id).subscribe({
      next: (res) => {
        this.solarPanelList = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.dataLoading = false;
        this.dataExist = res.totalElements != 0;
      }
    })
  }

  public getSolarPanelsFiltered(pageNo: number, id: any): void {
    this.dataLoading = true
    this.solarPanelService.getSolarPanelsFiltered(pageNo, id, this.sh).subscribe({
      next: (res) => {
        this.solarPanelList = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.dataLoading = false;
        this.dataExist = res.totalElements != 0;
        this.filteredData = true;
      }
    })
  }

  public search(): void {
    this.getSolarPanelsFiltered(0, this.companyDto.id);
  }

  public getImageUrl(base64String: string | undefined): string {
    return base64String ? `${base64String}` : ''; // Handle missing image
  }

  public updateSolarPanel(): void {
    this.solarPanelService.updateSolarPanels(this.solarPanel).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.stockLevel();
          this.pageNo = 0
        }
      }
    })
  }

  public deleteSolarPanel(): void {
    this.solarPanelService.deleteSolarPanels(this.solarPanel.id).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.getSolarPanels(0, this.companyDto.id);
          this.stockLevel();
          this.pageNo = 0
        }
      }
    })
  }


  ngOnInit() {
    this.companyDto = JSON.parse(sessionStorage.getItem('company') as any);
    if (sessionStorage.getItem('message') !== null) {
      this.message = sessionStorage.getItem('message') as string;
      setTimeout(() => {
        this.message = ""
        sessionStorage.setItem('message', "")
      }, 3000);
    }
    this.getSolarPanels(0, this.companyDto.id);
    this.stockLevel();
  }
}
