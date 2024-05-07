import {Component, OnInit} from '@angular/core';
import {Devis} from "../../models/Devis";
import {DevisService} from "../../services/devis/devis.service";

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.css']
})
export class DevisComponent implements OnInit {

  constructor(private devisService: DevisService) {
  }

  companyId: string = "";
  dataLoading : boolean = false;
  listDevis: Array<Devis> = [];
  pageNo: number = 0;
  totalPages: number = 0;
  totalElements: number = 0;
  sh: string = ""
  dataFiltered: boolean = false;


  devis: Devis = {
    id: "",
    date: "", ref: "", status: "",
    company: {id: ""},
    devisRequest: {id: ""},
    battery: {modelBattery: "", priceBattery: 0, quantityBattery: 0, totalBattery: 0, tvaBattery: 0},
    cable: {modelCable: "", priceCable: 0, quantityCable: 0, totalCable: 0, tvaCable: 0},
    meter: {modelMeter: "", priceMeter: 0, quantityMeter: 0, totalMeter: 0, tvaMeter: 0},
    inverter: {modelInverter: "", priceInverter: 0, quantityInverter: 0, totalInverter: 0, tvaInverter: 0},
    solarPanel: {modelSolarPanel: "", priceSolarPanel: 0, quantitySolarPanel: 0, totalSolarPanel: 0, tvaSolarPanel: 0},
    systemFixing: {
      modelSystemFixing: "",
      priceSystemFixing: 0,
      quantitySystemFixing: 0,
      totalSystemFixing: 0,
      tvaSystemFixing: 0
    },
    total: 0
  }

  public getDevisList(pageNo: number): void {
    this.dataLoading = true;
    this.devisService.getDevisList(pageNo, this.companyId).subscribe({
      next: (res) => {
        this.listDevis = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.dataLoading = false;
      }
    })
  }

  public getDevisListFiltered(pageNo: number): void {
    this.dataLoading = true;
    this.devisService.getDevisListFiltered(pageNo, this.companyId, this.sh,).subscribe({
      next: (res) => {
        this.listDevis = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.dataFiltered = true;
        this.dataLoading = false;
      }
    })
  }

  public search(): void {
    this.getDevisListFiltered(0);
  }

  public selectDevis(devis: Devis): void {
    this.devis = devis;
  }

  public previousPage():void{

  }

  public nextPage():void{

  }

  ngOnInit() {
    this.companyId = sessionStorage.getItem('company') as string;
    this.getDevisList(0);
  }
}
