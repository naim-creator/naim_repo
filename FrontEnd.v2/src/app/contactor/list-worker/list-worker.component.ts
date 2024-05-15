import {Component, OnInit} from '@angular/core';
import {WorkerService} from "../../services/worker/worker.service";
import {AuthService} from "../../services/authentication/auth.service";
import {User} from "../../models/User";
import {Worker} from "../../models/Worker";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-list-worker',
  templateUrl: './list-worker.component.html',
  styleUrls: ['./list-worker.component.css']
})
export class ListWorkerComponent implements OnInit {
  constructor(private workerService: WorkerService,
              private userService: UserService) {
  }

  workerList: Array<Worker> = []
  sh: string = ""
  errorMessage: string = ""
  goodRequest: boolean = false
  pageNo: number = 0
  totalPages: number = 0
  dataExist: boolean = false
  filteredData: boolean = false
  companyId: string = ""
  dataLoading: boolean = false;
  worker: Worker = {
    id: "", firstName: "", lastName: "", address: "", email: "", phone: "", profession: "", image: "",
    companyDto: {
      id: "", companyName: "", address: "", contact: "", contactorDto: {
        id: "", firstName: "", lastName: "", email: "", phone: "", address: "", licenceDto: {
          id: "", status: "", startedAt: "", expiredAt: ""
        }
      }
    }
  }
  user: User = {
    id: "", firstName: "", lastName: "", email: "", password: "", role: "", enabled: false
  }

  public getImageUrl(base64String: string | null): string {
    return base64String ? `${base64String}` : ''; // Handle missing image
  }

  public getWorkerListByCompany(pageNo: number): void {
    this.dataLoading = true;
    this.workerService.getWorkerListByCompany(pageNo, this.companyId).subscribe({
      next: (res) => {
        this.workerList = res.content
        this.totalPages = res.totalPages
        this.dataExist = res.content.length != 0
        this.dataLoading = false;
      }
    })
  }

  public getWorkerListByCompanyFiltered(pageNo: number): void {
    this.dataLoading = true;
    this.workerService.getWorkerListByCompanyFiltered(this.sh, pageNo, this.companyId).subscribe({
      next: (res) => {
        this.workerList = res.content
        this.totalPages = res.totalPages
        this.filteredData = res.content.length != 0;
        this.dataLoading = false;
      }
    })
  }

  public getUserByEmail(): void {
    this.userService.getAccount(this.worker.email).subscribe({
      next: (res) => {
        this.user = res
        console.log(res)
      }
    })
  }

  public updateAccount(): void {
    if (this.user.enabled) {
      this.userService.activateAccount(this.user.email).subscribe({
        error: (err) => {
          if (err.status === 200) {
            this.getWorkerListByCompany(0)
            this.errorMessage = "compte a été activer"
            this.goodRequest = true
          } else {
            this.getWorkerListByCompany(0)
            this.goodRequest = false
            this.errorMessage = "Un erreur a été servenu"
          }
        }
      })
    } else {
      this.userService.disableAccount(this.user.email).subscribe({
        error: (err) => {
          if (err.status === 200) {
            this.getWorkerListByCompany(0)
            this.errorMessage = "Compte a été désactiver"
            this.goodRequest = true
          } else {
            this.getWorkerListByCompany(0)
            this.errorMessage = "Un erreur a été servenu"
            this.goodRequest = false
          }
        }
      })
    }
  }

  public search(): void {
    this.getWorkerListByCompanyFiltered(0)
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
      if (!this.filteredData) {
        this.getWorkerListByCompany(this.pageNo);
      } else {
        this.getWorkerListByCompanyFiltered(this.pageNo);
      }
    } else {
      this.pageNo = 0
      if (!this.filteredData) {
        this.getWorkerListByCompany(this.pageNo);
      } else {
        this.getWorkerListByCompanyFiltered(this.pageNo);
      }
    }
  }

  public previousPage(): void {
    if (this.pageNo > 0) {
      this.pageNo -= 1
      if (!this.filteredData) {
        this.getWorkerListByCompany(this.pageNo);
      } else {
        this.getWorkerListByCompanyFiltered(this.pageNo);
      }
    } else {
      this.pageNo = this.totalPages - 1
      if (!this.filteredData) {
        this.getWorkerListByCompany(this.pageNo);
      } else {
        this.getWorkerListByCompanyFiltered(this.pageNo);
      }
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
          this.getWorkerListByCompany(0)
          this.updateAccount()
        } else {
          this.getWorkerListByCompany(0)
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
          this.getWorkerListByCompany(0)
          this.updateAccount()
        } else {
          this.errorMessage = "Un erreur a été servenu";
        }
      }
    })
  }

  ngOnInit() {
    this.companyId = sessionStorage.getItem('company') as string;
    this.getWorkerListByCompany(0)
  }
}
