import {Component, OnInit} from '@angular/core';
import {DevisRequestService} from "../../services/devis-request/devis-request.service";
import {DevisRequest} from "../../models/DevisRequest";
import {WorkerService} from "../../services/worker/worker.service";
import {ContactorService} from "../../services/contactor/contactor.service";
import {Contactor} from "../../models/Contactor";
import {Worker} from "../../models/Worker";
import {User} from "../../models/User";
import {filter} from "rxjs";
import {Router} from "@angular/router";
import {SharedDataService} from "../../services/shared-data/shared-data.service";

@Component({
  selector: 'app-devis-request',
  templateUrl: './devis-request.component.html',
  styleUrls: ['./devis-request.component.css']
})
export class DevisRequestComponent implements OnInit {

  constructor(private devisRequestService: DevisRequestService,
              private workerService: WorkerService,
              private contactorService: ContactorService,
              private route: Router,
              private sharedDataService: SharedDataService) {
  }

  devisRequest: DevisRequest = {
    firstName: "", lastName: "", email: "", phone: "", building_type: "", location: "", post_code: "",
    roof_type: "", consumption: 0, electricity_access: false, available_area: 0, company: {id: ""}, status: "en attente"
  }
  contactor: Contactor = {
    id: "", firstName: "", lastName: "", email: "", phone: "", address: "", company: null
  }
  worker: Worker = {
    id: "", firstName: "", lastName: "", address: "", email: "", phone: "", profession: "", image: "", company: {id: ""}
  }
  user: User = {
    id: "", firstName: "", lastName: "", email: "", password: "", role: "", enabled: false
  }
  devisRequestList: Array<DevisRequest> = []
  totalPages: number = 0
  pageNo: number = 0
  errorMessage: string = ""
  sh: string = ""
  dataExist: boolean = false
  filteredData: boolean = false
  totalElements: number = 0

  public getUserByEmail(): void {
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
    if (decodedToken.authorities[0] === "ENTREPRENEUR") {
      this.contactorService.getContactorByEmail(decodedToken.sub).subscribe({
        next: (res) => {
          this.contactor = res
          this.sharedDataService.contactor = res
          this.getDevisRequestByCompany(res.company.id, 0)
        }
      })
    } else {
      this.workerService.getWorkerByEmail(decodedToken.sub).subscribe({
        next: (res) => {
          this.worker = res
          this.sharedDataService.worker = res
          this.getDevisRequestByCompany(res.company.id, 0)
        }
      })
    }
  }

  public getDevisRequestByCompany(id: any, pageNo: number): void {
    this.devisRequestService.getDevisRequestByCompany(id, pageNo).subscribe({
      next: (res) => {
        this.devisRequestList = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        if (res.totalElements != 0) {
          this.dataExist = true
        } else {
          this.dataExist = false
        }
      }
    })
  }

  public getDevisRequestByCompanyFiltered(id: any, filter: string, pageNo: number): void {
    this.devisRequestService.getDevisRequestByCompanyFiltered(id, pageNo, filter).subscribe({
      next: (res) => {
        this.devisRequestList = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
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
    let id: any = this.contactor.company?.id
    this.getDevisRequestByCompanyFiltered(id, this.sh, 0)
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
          if (this.worker.company?.id != "") {
            this.getDevisRequestByCompany(this.worker.company?.id, this.pageNo)
          } else {
            this.getDevisRequestByCompany(this.contactor.company?.id, this.pageNo)
          }
        }
      }
    })
  }

  public nextPage(): void {
    if (this.pageNo < this.totalPages - 1) {
      this.pageNo += 1
      if (!this.filteredData) {
        if (this.worker.company?.id != "") {
          this.getDevisRequestByCompany(this.worker.company?.id, this.pageNo)
        } else {
          this.getDevisRequestByCompany(this.contactor.company?.id, this.pageNo)
        }
      } else {
        if (this.worker.company?.id != "") {
          this.getDevisRequestByCompanyFiltered(this.worker.company?.id, this.sh, this.pageNo)
        } else {
          this.getDevisRequestByCompanyFiltered(this.contactor.company?.id, this.sh, this.pageNo)
        }
      }
    } else {
      this.pageNo = 0
      if (!this.filteredData) {
        if (this.worker.company?.id != "") {
          this.getDevisRequestByCompany(this.worker.company?.id, this.pageNo)
        } else {
          this.getDevisRequestByCompany(this.contactor.company?.id, this.pageNo)
        }
      } else {
        if (this.worker.company?.id != "") {
          this.getDevisRequestByCompanyFiltered(this.worker.company?.id, this.sh, this.pageNo)
        } else {
          this.getDevisRequestByCompanyFiltered(this.contactor.company?.id, this.sh, this.pageNo)
        }
      }
    }
  }

  public previousPage(): void {
    if (this.pageNo > 0) {
      this.pageNo -= 1
      if (!this.filteredData) {
        if (this.worker.company?.id != "") {
          this.getDevisRequestByCompany(this.worker.company?.id, this.pageNo)
        } else {
          this.getDevisRequestByCompany(this.contactor.company?.id, this.pageNo)
        }
      } else {
        if (this.worker.company?.id != "") {
          this.getDevisRequestByCompanyFiltered(this.worker.company?.id, this.sh, this.pageNo)
        } else {
          this.getDevisRequestByCompanyFiltered(this.contactor.company?.id, this.sh, this.pageNo)
        }
      }
    } else {
      this.pageNo = this.totalPages - 1
      if (!this.filteredData) {
        if (this.worker.company?.id != "") {
          this.getDevisRequestByCompany(this.worker.company?.id, this.pageNo)
        } else {
          this.getDevisRequestByCompany(this.contactor.company?.id, this.pageNo)
        }
      } else {
        if (this.worker.company?.id != "") {
          this.getDevisRequestByCompanyFiltered(this.worker.company?.id, this.sh, this.pageNo)
        } else {
          this.getDevisRequestByCompanyFiltered(this.contactor.company?.id, this.sh, this.pageNo)
        }
      }
    }
  }

  public navigateToCreateNewDevis(devisRequest: DevisRequest): void {
    this.sharedDataService.devisRequest = devisRequest
    this.sharedDataService.worker = this.worker;
    this.sharedDataService.contactor = this.contactor;
    this.route.navigate(['contactor/devis/new'])
  }

  public selectDevisRequest(devisRequest: DevisRequest): void {
    this.devisRequest = devisRequest;
  }

  public navigateToCreateNewRequest(): void {
    this.route.navigate(['contactor/request-devis/new'])
  }

  ngOnInit() {
    this.getUserByEmail()
  }
}
