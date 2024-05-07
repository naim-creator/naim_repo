import {Component} from '@angular/core';
import {ContactorService} from "../../services/contactor/contactor.service";
import {AuthService} from "../../services/authentication/auth.service";
import {Contactor} from "../../models/Contactor";

@Component({
  selector: 'app-list-contactor',
  templateUrl: './list-contactor.component.html',
  styleUrls: ['./list-contactor.component.css']
})
export class ListContactorComponent {
  constructor(private service: ContactorService,
              private authService: AuthService) {
  }

  filteredData: boolean = false
  accountActive: boolean = false;
  goodRequest: boolean = true;
  errorMessage: string = ""
  contactorList: Array<Contactor> = []
  dataExist: boolean = false
  totalPages: number = 0
  pageNo: number = 0
  sh: string = ""
  dataLoading: boolean = true;
  contactor: Contactor = {
    id: "", firstName: "", lastName: "", email: "", phone: "", address: ""
  }

  public selectContactor(contactor: Contactor): void {
    this.contactor = contactor;
    let email: any = contactor.email;
    this.getAccountByEmail(email);
  }

  public nextPage(): void {
    if (this.pageNo < this.totalPages - 1) {
      this.pageNo += 1
      if (!this.filteredData) {
        this.getContactorList(this.pageNo)
      } else {
        this.getContactorListByFilter(this.pageNo, this.sh)
      }
    } else {
      this.pageNo = 0
      if (!this.filteredData) {
        this.getContactorList(this.pageNo)
      } else {
        this.getContactorListByFilter(this.pageNo, this.sh)
      }
    }
  }

  public previousPage(): void {
    if (this.pageNo > 0) {
      this.pageNo -= 1
      if (!this.filteredData) {
        this.getContactorList(this.pageNo)
      } else {
        this.getContactorListByFilter(this.pageNo, this.sh)
      }
    } else {
      this.pageNo = this.totalPages - 1
      if (!this.filteredData) {
        this.getContactorList(this.pageNo)
      } else {
        this.getContactorListByFilter(this.pageNo, this.sh)
      }
    }
  }

  public search(): void {
    this.getContactorListByFilter(0, this.sh);
  }

  public activateAccount(): void {
    this.authService.activateAccount(this.contactor).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.errorMessage = err.error.text;
          this.goodRequest = true;
        } else {
          this.errorMessage = "Un problème est servenu";
          this.goodRequest = false;
        }
      }
    })
  }

  public disableAccount(): void {
    this.authService.disableAccount(this.contactor).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.errorMessage = err.error.text;
          this.goodRequest = true;
        } else {
          this.errorMessage = "Un problème est servenu";
          this.goodRequest = false;
        }
      }
    })
  }

  public updateContactor(): void {
    this.service.updateContactor(this.contactor).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.errorMessage = "Donnée a été mise à jour";
          this.goodRequest = true;
          if (this.accountActive) {
            this.activateAccount();
          } else {
            this.disableAccount();
          }
        } else {
          this.errorMessage = "Un problème est servenu";
          this.goodRequest = false;
        }
      }
    })
  }

  public deleteContactor(): void {
    this.service.deleteContactor(this.contactor).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.errorMessage = "Donnée a été supprimer";
          this.goodRequest = true;
          this.getContactorList(this.pageNo)
        } else {
          this.errorMessage = "Un problème est servenu";
          this.goodRequest = false;
        }
      }
    })
  }

  public getAccountByEmail(email: string): void {
    this.authService.getAccountByEmail(email).subscribe({
      next: (res) => {
        this.accountActive = res.enabled
      }
    })
  }


  public getContactorList(page: number): void {
    this.dataLoading = true;
    this.service.getContactorList(page).subscribe({
      next: (res) => {
        this.contactorList = res.content
        this.totalPages = res.totalPages
        this.dataExist = res.content.length != 0 && res.totalPages > 1;
        this.dataLoading = false;
      }
    })
  }

  public getContactorListByFilter(page: number, filter: string): void {
    this.dataLoading = true;
    this.service.getContactorListByFilter(page, filter).subscribe({
      next: (res) => {
        this.contactorList = res.content
        this.totalPages = res.totalPages
        this.dataLoading = false;
        this.filteredData = res.content.length != 0 && res.totalPages > 1;
      }
    })
  }

  ngOnInit() {
    this.getContactorList(this.pageNo)
  }
}
