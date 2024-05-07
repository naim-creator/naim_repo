import {Component, OnInit} from '@angular/core';
import {DevisRequestService} from "../../services/devis-request/devis-request.service";
import {DevisRequest} from "../../models/DevisRequest";
import {Router} from "@angular/router";
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
    roof_type: "", consumption: 0, electricity_access: false, available_area: 0, company: {id: ""}, status: "en attente"
  }
  companyId: string = ""
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
    this.devisRequestService.getDevisRequestByCompany(this.companyId, pageNo).subscribe({
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
    this.devisRequestService.getDevisRequestByCompanyFiltered(this.companyId, pageNo, filter).subscribe({
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
          this.errorMessage = err.error.text
        }
      }
    })
  }

  public deleteDevisRequest(): void {
    this.devisRequestService.deleteDevisRequest(this.devisRequest.id).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.errorMessage = err.error.text
          if (this.devisRequestList.length == 1 && this.pageNo > 0) {
            this.pageNo -= 1
          }
          this.getDevisRequestByCompany(this.pageNo)
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
    this.companyId = sessionStorage.getItem('company') as string;
    this.getDevisRequestByCompany(0);
  }
}
