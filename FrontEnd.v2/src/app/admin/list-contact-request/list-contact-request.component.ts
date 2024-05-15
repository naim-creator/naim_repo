import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ContactorRequest} from "../../models/ContactorRequest";
import {ContactRequestService} from "../../services/contact-request/contact-request.service";

@Component({
  selector: 'app-list-contact-request',
  templateUrl: './list-contact-request.component.html',
  styleUrls: ['./list-contact-request.component.css']
})
export class ListContactRequestComponent implements OnInit {
  constructor(private service: ContactRequestService,
              private route: Router) {
  }


  updateRequestMessage: string = "";
  dataExist: boolean = true;
  filteredData: boolean = false;
  sh: string = ""
  dataLoading: boolean = true;
  contactorRequestList: Array<ContactorRequest> = [];
  totalPages: number = 0
  pageNo: number = 0;
  errorMessage: string = "";
  totalElements: number = 0;
  contactorRequest: ContactorRequest = {
    email: "",
    firstName: "",
    phone: "",
    message: "",
    companyName: "",
    companyAddress: "",
    lastName: "",
    status: "",
    date: new Date()
  }

  public search(): void {
    this.getContactorRequestListByFilter(0, this.sh)
  }

  public navigateToCreateContactor(request: ContactorRequest): void {
    sessionStorage.setItem('request', JSON.stringify(request));
    this.route.navigate(['admin/contactor/new']);
  }

  public nextPage(): void {
    if (this.pageNo < this.totalPages - 1) {
      this.pageNo += 1
      if (!this.filteredData) {
        this.getContactorRequestList(this.pageNo)
      } else {
        this.getContactorRequestListByFilter(this.pageNo, this.sh)
      }
    } else {
      this.pageNo = 0
      if (!this.filteredData) {
        this.getContactorRequestList(this.pageNo)
      } else {
        this.getContactorRequestListByFilter(this.pageNo, this.sh)
      }
    }
  }

  public previousPage(): void {
    if (this.pageNo > 0) {
      this.pageNo -= 1
      if (!this.filteredData) {
        this.getContactorRequestList(this.pageNo)
      } else {
        this.getContactorRequestListByFilter(this.pageNo, this.sh)
      }
    } else {
      this.pageNo = this.totalPages - 1
      if (!this.filteredData) {
        this.getContactorRequestList(this.pageNo)
      } else {
        this.getContactorRequestListByFilter(this.pageNo, this.sh)
      }
    }
  }

  public selectContactorRequest(contactorRequest: ContactorRequest) {
    this.contactorRequest = contactorRequest;
  }

  public deleteContactorRequest(): void {
    this.service.deleteContactorRequest(this.contactorRequest).subscribe({
      error: (err) => {
        if (err.status === 200) {
          if (this.contactorRequestList.length == 1 && this.pageNo > 0) {
            this.pageNo -= 1
          }
          this.updateRequestMessage = err.error.text;
          this.getContactorRequestList(this.pageNo)
        } else {
          this.updateRequestMessage = "error est servenu";
        }
      }
    })
  }

  public getContactorRequestList(pageNo: number): void {
    this.dataLoading = true;
    this.service.getContactorRequestList(pageNo).subscribe({
      next: (res) => {
        this.contactorRequestList = res.content
        this.totalPages = res.totalPages
        this.totalElements = res.totalElements
        this.dataExist = res.totalElements != 0;
        this.dataLoading = false;
      }
    })
  }

  public getContactorRequestListByFilter(pageNo: number, filter: string): void {
    this.dataLoading = true;
    this.service.getContactorRequestListByFilter(pageNo, filter).subscribe({
      next: (res) => {
        this.contactorRequestList = res.content
        this.totalPages = res.totalPages
        this.totalElements = res.totalElements
        this.filteredData = true;
        this.dataExist = res.totalElements != 0;
        this.dataLoading = false;
      }
    })
  }

  public declineRequest(request: ContactorRequest): void {
    request.status = "refuser";
    this.service.updateContactorRequest(request).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.updateRequestMessage = err.error.text;
        } else {
          this.updateRequestMessage = "error est servenu";
        }
      }
    });
  }

  ngOnInit() {
    this.getContactorRequestList(this.pageNo)
  }
}
