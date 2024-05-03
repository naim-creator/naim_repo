import { Component } from '@angular/core';
import {WorkerService} from "../../services/worker/worker.service";
import {ContactorService} from "../../services/contactor/contactor.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/authentication/auth.service";
import {Company} from "../../models/Company";
import {Contactor} from "../../models/Contactor";
import {User} from "../../models/User";
import {Worker} from "../../models/Worker";
@Component({
  selector: 'app-list-worker',
  templateUrl: './list-worker.component.html',
  styleUrls: ['./list-worker.component.css']
})
export class ListWorkerComponent {
  constructor(private workerService: WorkerService,
              private contactorService: ContactorService,
              private route: Router,
              private authService: AuthService) {
  }

  workerList: Array<Worker> = []
  sh: string = ""
  errorMessage: string = ""
  goodRequest: boolean = false
  pageNo: number = 0
  totalPages: number = 0
  companyExist: boolean = false
  dataExist: boolean = false
  filteredData: boolean = false
  company: Company = {
    id: "", name: "", address: "", contact: "", contactor: {id: ""}
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

  public navigateToSaveNewWorker(): void {
    this.route.navigate(['contactor/worker/new'])
  }

  public getContactorByEmail(): void {
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
    this.contactorService.getContactorByEmail(decodedToken.sub).subscribe({
      next: (res) => {
        this.contactor = res
        if (res.company != null) {
          this.companyExist = true
          this.company = res.company
          this.getWorkerListByCompany()
        }
      }
    })
  }

  public getImageUrl(base64String: string | null): string {
    return base64String ? `${base64String}` : ''; // Handle missing image
  }

  public getWorkerListByCompany(): void {
    this.workerService.getWorkerListByCompany(this.pageNo, this.company.id).subscribe({
      next: (res) => {
        this.workerList = res.content
        this.totalPages = res.totalPages
        console.log(res)
        if (res.content.length != 0 && res.totalPages > 1) {
          this.dataExist = true
          this.filteredData = true
        } else {
          this.dataExist = false
          this.filteredData = false
        }
      }
    })
  }

  public getWorkerListByCompanyFiltered(): void {
    this.workerService.getWorkerListByCompanyFiltered(this.sh,0, this.company.id).subscribe({
      next: (res) => {
        this.workerList = res.content
        this.totalPages = res.totalPages
        if (res.content.length != 0 && res.totalPages > 1) {
          this.dataExist = true
          this.filteredData = true
        } else {
          this.dataExist = false
          this.filteredData = false
        }
      }
    })
  }

  public getUserByEmail(): void {
    this.authService.getAccountByEmail(this.worker.email).subscribe({
      next: (res) => {
        this.user = res
        console.log(res)
      }
    })
  }

  public updateAccount(): void {
    if (this.user.enabled) {
      this.authService.activateAccount(this.user).subscribe({
        error: (err) => {
          if (err.status === 200) {
            this.getWorkerListByCompany()
            this.errorMessage = "compte a été activer"
            this.goodRequest = true
          } else {
            this.getWorkerListByCompany()
            this.goodRequest = false
            this.errorMessage = "Un erreur a été servenu"
          }
        }
      })
    } else {
      this.authService.disableAccount(this.user).subscribe({
        error: (err) => {
          if (err.status === 200) {
            this.getWorkerListByCompany()
            this.errorMessage = "Compte a été désactiver"
            this.goodRequest = true
          } else {
            this.getWorkerListByCompany()
            this.errorMessage = "Un erreur a été servenu"
            this.goodRequest = false
          }
        }
      })
    }
  }

  public search(): void {
    this.getWorkerListByCompanyFiltered()
  }

  public selectWorkerToUpdate(worker: Worker): void {
    this.worker = worker
    this.getUserByEmail()
  }

  public selectWorkerToDelete(worker: Worker): void {
    this.user.email = worker.email;
    this.user.role = worker.profession;
    this.user.firstName = worker.firstName;
    this.user.lastName = worker.lastName;
    this.user.enabled = false
    this.worker = worker
  }


  public nextPage(): void {
    if (this.pageNo < this.totalPages - 1) {
      this.pageNo += 1
    } else {
      this.pageNo = 0
    }
  }

  public previousPage(): void {
    if (this.pageNo > 0) {
      this.pageNo -= 1
    } else {
      this.pageNo = this.totalPages - 1
    }
  }

  public updateWorker(): void {
    this.user.email = this.worker.email;
    this.user.role = this.worker.profession;
    this.user.firstName = this.worker.firstName;
    this.user.lastName = this.worker.lastName;
    this.workerService.updateWorker(this.worker).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.errorMessage = "ouvrier a été modifier"
          this.goodRequest = true
          this.getWorkerListByCompany()
          this.updateAccount()
        } else {
          this.getWorkerListByCompany()
          this.goodRequest = false
          this.errorMessage = "Un erreur a été servenu"
        }
      }
    })
  }

  public deleteWorker(): void {
    this.workerService.deleteWorker(this.worker).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.getWorkerListByCompany()
          this.updateAccount()
        } else {
          this.errorMessage = "Un erreur a été servenu";
        }
      }
    })
  }

  ngOnInit() {
    this.getContactorByEmail()
  }
}
