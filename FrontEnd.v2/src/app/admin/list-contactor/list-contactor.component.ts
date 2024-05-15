import {Component, OnInit} from '@angular/core';
import {ContactorService} from "../../services/contactor/contactor.service";
import {Contactor} from "../../models/Contactor";
import {LicenceService} from "../../services/licence/licence.service";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-list-contactor',
  templateUrl: './list-contactor.component.html',
  styleUrls: ['./list-contactor.component.css']
})
export class ListContactorComponent implements OnInit {
  constructor(private service: ContactorService,
              private userService: UserService,
              private licenceService: LicenceService) {
  }

  updateRequestMessage: any = "";
  updateAccountMessage: any = "";
  updateContactorMessage: any = "";
  updateLicenceMessage: any = "";
  filteredData: boolean = false;
  accountActive: boolean = false;
  contactorList: Array<Contactor> = []
  dataExist: boolean = true;
  totalPages: number = 0
  pageNo: number = 0
  totalElements: number = 0
  sh: string = ""
  licenceUpdate: boolean = false;
  dataLoading: boolean = true;
  duration: number = 0;
  contactor: Contactor = {
    id: "", firstName: "", lastName: "", email: "", phone: "", address: "",
    licenceDto: {id: "", expiredAt: "", startedAt: "", status: ""}
  }

  public selectContactor(contactor: Contactor): void {
    console.log(contactor)
    this.contactor = contactor;
    this.getAccountByEmail(contactor.email);
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
    this.userService.activateAccount(this.contactor.email).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.updateAccountMessage = err.error.text;
        } else {
          this.updateAccountMessage = "Un problème est servenu";
        }
      }
    })
  }

  public disableAccount(): void {
    this.userService.disableAccount(this.contactor.email).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.updateAccountMessage = err.error.text;
        } else {
          this.updateAccountMessage = "Un problème est servenu";
        }
      }
    })
  }

  public updateContactor(): void {
    this.service.updateContactor(this.contactor).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.updateContactorMessage = err.error.text;
        } else {
          this.updateContactorMessage = "Un problème est servenu";
        }
      }
    })
    if (this.licenceUpdate) {
      this.updateLicence();
    }
  }

  public updateAccount(): void {
    switch (this.accountActive) {
      case true: {
        this.activateAccount();
        break;
      }
      case false: {
        this.disableAccount();
        break;
      }
    }
  }

  public deleteContactor(): void {
    this.service.deleteContactor(this.contactor).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.updateContactorMessage = err.error.text;
          this.getContactorList(this.pageNo);
        } else {
          this.updateContactorMessage = "error est servenu";
        }
      }
    })
  }

  public getAccountByEmail(email: string): void {
    this.userService.getAccount(email).subscribe({
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
        this.totalElements = res.totalElements;
        this.dataLoading = false;
        if (res.totalElements === 0) {
          this.dataExist = false;
        }
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
        this.dataExist = true;
        this.filteredData = true;
        if (res.totalElements === 0) {
          this.dataExist = false;
        }
      }
    })
  }

  public selectLicence(event: any): void {
    this.duration = Number(event.target.value);
    this.licenceUpdate = true;
  }

  public updateLicence(): void {
    this.licenceService.updateLicence(this.duration, this.contactor.licenceDto).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.updateLicenceMessage = err.error.text;
          this.getContactorList(this.pageNo)
        } else {
          this.updateLicenceMessage = "error est servenu";
        }
      }
    })
  }

  ngOnInit() {
    this.updateRequestMessage = sessionStorage.getItem('message') as string;
    this.updateContactorMessage = sessionStorage.getItem('contactorMessage') as string;
    setTimeout(() => {
      this.updateRequestMessage = null;
      this.updateContactorMessage = null;
      sessionStorage.removeItem('message');
      sessionStorage.removeItem('contactorMessage');
    }, 3000)
    this.getContactorList(this.pageNo)
  }
}
