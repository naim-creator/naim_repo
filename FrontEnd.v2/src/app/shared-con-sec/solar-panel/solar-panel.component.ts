import {Component, OnInit} from '@angular/core';
import {SolarPanelService} from "../../services/solar-panel/solar-panel.service";
import {SolarPanel} from "../../models/solar-panel";

@Component({
  selector: 'app-solar-panel',
  templateUrl: './solar-panel.component.html',
  styleUrls: ['./solar-panel.component.css']
})
export class SolarPanelComponent implements OnInit {

    constructor(private solarPanelService: SolarPanelService) {
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
  companyId: string = "";
  dataLoading: boolean = true;
  solarPanel: SolarPanel = {
    id: 0, company: {id: ""}, quantity: 0, type_cell: "", image: "", weight: 0, maximum_current: 0, maximum_voltage: 0,
    model: "", nominal_power: 0, width: 0, price: 0, height: 0
  }

  public stockLevel(): void {
    this.solarPanelService.getSolarPanelStockLevel(this.companyId).subscribe({
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
        this.getSolarPanels(this.pageNo, this.companyId)
      } else {
        this.getSolarPanelsFiltered(this.pageNo, this.companyId)
      }
    } else {
      this.pageNo = 0
      if (!this.filteredData) {
        this.getSolarPanels(this.pageNo, this.companyId)
      } else {
        this.getSolarPanelsFiltered(this.pageNo, this.companyId)
      }
    }
  }

  public previousPage(): void {
    if (this.pageNo > 0) {
      this.pageNo -= 1
      if (!this.filteredData) {
        this.getSolarPanels(this.pageNo, this.companyId)
      } else {
        this.getSolarPanelsFiltered(this.pageNo, this.companyId)
      }
    } else {
      this.pageNo = this.totalPages - 1
      if (!this.filteredData) {
        this.getSolarPanels(this.pageNo, this.companyId)
      } else {
        this.getSolarPanelsFiltered(this.pageNo, this.companyId)
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
        this.filteredData = res.totalElements != 0;
      }
    })
  }

  public search(): void {
    this.getSolarPanelsFiltered(0, this.companyId);
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
          this.getSolarPanels(0, this.companyId);
          this.stockLevel();
          this.pageNo = 0
        }
      }
    })

  }


  ngOnInit() {
    this.companyId = sessionStorage.getItem('company') as string;
    this.getSolarPanels(0, this.companyId);
    this.stockLevel();
  }
}
