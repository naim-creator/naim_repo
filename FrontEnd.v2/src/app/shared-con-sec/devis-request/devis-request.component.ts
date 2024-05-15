import {Component, OnInit} from '@angular/core';
import {DevisRequestService} from "../../services/devis-request/devis-request.service";
import {DevisRequest} from "../../models/DevisRequest";
import {Router} from "@angular/router";
import {Company} from "../../models/Company";

@Component({
  selector: 'app-devis-request',
  templateUrl: './devis-request.component.html',
  styleUrls: ['./devis-request.component.css']
})
export class DevisRequestComponent implements OnInit {

  constructor(private devisRequestService: DevisRequestService,
              private route: Router) {
  }

  devisRequest: DevisRequest = {
    firstName: "", lastName: "", email: "", phone: "", building_type: "", location: "", post_code: "",
    roof_type: "", consumption: 0, electricity_access: false, available_area: 0, companyDto: {
      id: "", companyName: "", contactorDto: {
        id: "", firstName: "", lastName: "", address: "", email: "", phone: "",
        licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
      }, address: "", contact: ""
    }, status: "en attente"
  }
  companyDto: Company = {
    id: "", companyName: "", contactorDto: {
      id: "", firstName: "", lastName: "", address: "", email: "", phone: "",
      licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
    }, address: "", contact: ""
  }
  message: string = "";
  devisRequestList: Array<DevisRequest> = []
  totalPages: number = 0
  pageNo: number = 0
  errorMessage: string = ""
  sh: string = ""
  dataExist: boolean = false
  filteredData: boolean = false
  totalElements: number = 0
  dataLoading: boolean = false;

  public getDevisRequestByCompany(pageNo: number): void {
    this.dataLoading = true;
    this.devisRequestService.getDevisRequestByCompany(this.companyDto.id, pageNo).subscribe({
      next: (res) => {
        this.devisRequestList = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.dataExist = res.totalElements != 0;
        this.dataLoading = false;
      }
    })
  }

  public getDevisRequestByCompanyFiltered(filter: string, pageNo: number): void {
    this.dataLoading = true;
    this.devisRequestService.getDevisRequestByCompanyFiltered(this.companyDto.id, pageNo, filter).subscribe({
      next: (res) => {
        this.devisRequestList = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.dataLoading = false;
        if (res.totalElements != 0) {
          this.dataExist = true
          this.filteredData = true
        } else {
          this.dataExist = false
          this.filteredData = false
        }
      }
    })
  }

  public search(): void {
    this.getDevisRequestByCompanyFiltered(this.sh, 0);
  }

  public updateDevisRequest(): void {
    this.devisRequestService.updateDevisRequest(this.devisRequest).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.message = err.error.text
          setTimeout(()=>{
            this.message = ""
          },3000)
        }
      }
    })
  }

  public deleteDevisRequest(): void {
    this.devisRequestService.deleteDevisRequest(this.devisRequest.id).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.message = err.error.text
          if (this.devisRequestList.length == 1 && this.pageNo > 0) {
            this.pageNo -= 1
          }
          this.getDevisRequestByCompany(this.pageNo)
          setTimeout(()=>{
            this.message = ""
          },3000)
        }
      }
    })
  }

  public nextPage(): void {
    if (this.pageNo < this.totalPages - 1) {
      this.pageNo += 1
      if (!this.filteredData) {
        this.getDevisRequestByCompany(this.pageNo)
      } else {
        this.getDevisRequestByCompanyFiltered(this.sh, this.pageNo)
      }
    } else {
      this.pageNo = 0
      if (!this.filteredData) {
        this.getDevisRequestByCompany(this.pageNo)
      } else {
        this.getDevisRequestByCompanyFiltered(this.sh, this.pageNo)
      }
    }
  }

  public previousPage(): void {
    if (this.pageNo > 0) {
      this.pageNo -= 1
      if (!this.filteredData) {
        this.getDevisRequestByCompany(this.pageNo)
      } else {
        this.getDevisRequestByCompanyFiltered(this.sh, this.pageNo)
      }
    } else {
      this.pageNo = this.totalPages - 1
      if (!this.filteredData) {
        this.getDevisRequestByCompany(this.pageNo)
      } else {
        this.getDevisRequestByCompanyFiltered(this.sh, this.pageNo)
      }
    }
  }

  public navigateToCreateNewDevis(devisRequest: DevisRequest): void {
    sessionStorage.setItem('devis-request', JSON.stringify(devisRequest));
    this.route.navigate(['contactor/devis/new']).then(r => console.log(r))
  }

  public selectDevisRequest(devisRequest: DevisRequest): void {
    this.devisRequest = devisRequest;
  }

  ngOnInit() {
    this.companyDto = JSON.parse(sessionStorage.getItem('company') as any);
    this.getDevisRequestByCompany(0);
    if (sessionStorage.getItem('message') !== null) {
      this.message = sessionStorage.getItem('message') as string;
      setTimeout(() => {
        this.message = ""
        sessionStorage.setItem('message', "")
      }, 3000);
    }
  }
}
