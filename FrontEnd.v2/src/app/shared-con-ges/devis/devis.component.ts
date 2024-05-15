import {Component, OnInit} from '@angular/core';
import {Devis} from "../../models/Devis";
import {DevisService} from "../../services/devis/devis.service";
import {MailService} from "../../services/mail/mail.service";
import {Router} from "@angular/router";
import {Company} from "../../models/Company";

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.css']
})
export class DevisComponent implements OnInit {

  constructor(private devisService: DevisService,
              private mailService: MailService,
              private route: Router) {
  }

  linkAccept: string = "http://localhost:8080/devis/accept/"
  companyDto: Company = {
    id: "", companyName: "", contactorDto: {
      id: "", firstName: "", lastName: "", address: "", email: "", phone: "",
      licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
    }, address: "", contact: ""
  }
  dataExist:boolean = true;
  message: any = "";
  dataLoading: boolean = false;
  listDevis: Array<Devis> = [];
  pageNo: number = 0;
  totalPages: number = 0;
  totalElements: number = 0;
  sh: string = ""
  dataFiltered: boolean = false;
  file: any;
  mailBody: string = "";
  requestSent: boolean = false;
  devis: Devis = {
    idDevis: "",
    date: "", ref: "", about: "",
    companyDto: {
      id: "", companyName: "", contactorDto: {
        id: "", firstName: "", lastName: "", address: "", email: "", phone: "",
        licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
      }, address: "", contact: ""
    },
    devisRequestDto: {
      id: "",
      phone: "",
      firstName: "",
      lastName: "",
      location: "",
      email: "",
      status: "",
      available_area: 0,
      consumption: 0,
      building_type: "",
      roof_type: "",
      electricity_access: false,
      post_code: "",
      companyDto: {
        id: "", companyName: "", contactorDto: {
          id: "", firstName: "", lastName: "", address: "", email: "", phone: "",
          licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
        }, address: "", contact: ""
      }
    },
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
    this.devisService.getDevisList(pageNo, this.companyDto.id).subscribe({
      next: (res) => {
        this.listDevis = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.dataLoading = false;
        this.dataExist = res.totalElements != 0;
      }
    })
  }

  public getDevisListFiltered(pageNo: number): void {
    this.dataLoading = true;
    this.devisService.getDevisListFiltered(pageNo, this.companyDto.id, this.sh,).subscribe({
      next: (res) => {
        this.listDevis = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.dataFiltered = true;
        this.dataLoading = false;
        this.dataExist = res.totalElements != 0;
      }
    })
  }

  public search(): void {
    this.getDevisListFiltered(0);
  }

  public selectDevis(devis: Devis): void {
    this.devis = devis;
  }

  public deleteDevis(): void {
    this.devisService.deleteDevis(this.devis.idDevis).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.message = err.error.text;
          setTimeout(()=>{
            this.message = null;
          },3000)
          this.getDevisList(this.pageNo);
        }
      }
    })
  }

  public updateDevis(): void {
    this.devisService.updateDevis(this.devis).subscribe({
      error: (err) => {
        this.message = err.error.text;
        setTimeout(()=>{
          this.message = null;
        },3000)
      }
    })
  }

  public previousPage(): void {

  }

  public nextPage(): void {

  }

  public calculateTotal(): void {
    this.devis.total = this.devis.solarPanel.totalSolarPanel +
      this.devis.inverter.totalInverter +
      this.devis.systemFixing.totalSystemFixing +
      this.devis.meter.totalMeter +
      this.devis.cable.totalCable +
      this.devis.battery.totalBattery
  }

  public sendMail(devis: any): void {
    let mail: FormData = new FormData();
    mail.append('attachment', this.file);
    mail.append('to', devis.devisRequestDto.email);
    mail.append('subject', 'Devis Photovoltaique')
    mail.append('body', 'Cher ' +
      devis.devisRequestDto.firstName +
      " " + devis.devisRequestDto.lastName +
      ' ' + this.mailBody + this.linkAccept
      + devis.idDevis + "?companyId=" + this.companyDto.id);
    this.requestSent = true
    this.mailService.sendMail(mail).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.requestSent = false
          this.devis.about = "à accepter"
          this.devisService.updateDevis(this.devis).subscribe()
        }
      }
    })
  }

  public changeFile(event: any): void {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  public printDevis(devis: Devis): void {
    this.devisService.printDevis(devis).subscribe(
      res => {
        const url = window.URL.createObjectURL(res);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'devis.pdf';
        link.click();
      }
    )
  }

  public navigateToCreateConstruction(devis: Devis): void {
    this.route.navigate(['contactor/construction/new']).then(r => sessionStorage.setItem('devis', JSON.stringify(devis)))
  }

  ngOnInit() {
    this.message = sessionStorage.getItem('message') as string;
    setTimeout(()=>{
      sessionStorage.removeItem('message');
      this.message = null;
    },3000)
    this.companyDto = JSON.parse(sessionStorage.getItem('company') as any);
    this.getDevisList(0);
  }
}
