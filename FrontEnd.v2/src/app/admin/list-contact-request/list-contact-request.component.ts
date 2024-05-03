import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ContactorRequest} from "../../models/ContactorRequest";
import {ContactRequestService} from "../../services/contact-request/contact-request.service";

@Component({
  selector: 'app-list-contact-request',
  templateUrl: './list-contact-request.component.html',
  styleUrls: ['./list-contact-request.component.css']
})
export class ListContactRequestComponent implements OnInit{
  constructor(private service: ContactRequestService,
              private route: Router) {
  }

  goodRequest: boolean = false
  dataExist = false;
  filteredData : boolean = false;
  sh: string = ""
  contactorRequestList: Array<ContactorRequest> = [];
  totalPages: number = 0
  pageNo: number = 0;
  errorMessage: string = "";
  contactorRequest: ContactorRequest = {
    email: "",
    firstName: "",
    phone: "",
    message: "",
    companyName: "",
    companyAddress: "",
    lastName: "",
    date: new Date()
  }

  public search(): void {
    this.getContactorRequestListByFilter(0, this.sh)
  }

  public navigateToCreateContactor(): void {
    this.route.navigate(['admin/contactor/new']);
  }

  public nextPage(): void {
    if (this.pageNo < this.totalPages - 1) {
      this.pageNo += 1
      if(!this.filteredData){
        this.getContactorRequestList(this.pageNo)
      }else{
        this.getContactorRequestListByFilter(this.pageNo,this.sh)
      }
    } else {
      this.pageNo = 0
      if(!this.filteredData){
        this.getContactorRequestList(this.pageNo)
      }else{
        this.getContactorRequestListByFilter(this.pageNo,this.sh)
      }
    }
  }

  public previousPage(): void {
    if (this.pageNo > 0) {
      this.pageNo -= 1
      if(!this.filteredData){
        this.getContactorRequestList(this.pageNo)
      }else{
        this.getContactorRequestListByFilter(this.pageNo,this.sh)
      }
    } else {
      this.pageNo = this.totalPages - 1
      if(!this.filteredData){
        this.getContactorRequestList(this.pageNo)
      }else{
        this.getContactorRequestListByFilter(this.pageNo,this.sh)
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
          this.getContactorRequestList(this.pageNo)
        }
      }
    })
  }

  public getContactorRequestList(pageNo: number): void {
    this.service.getContactorRequestList(pageNo).subscribe({
      next: (res) => {
        this.contactorRequestList = res.content
        this.totalPages = res.totalPages
        if (res.totalElements != 0 && res.totalPages > 1) {
          this.dataExist = true
        } else {
          this.dataExist = false
        }
      }
    })
  }

  public getContactorRequestListByFilter(pageNo : number,filter : string):void{
    this.service.getContactorRequestListByFilter(pageNo, filter).subscribe({
      next:(res)=>{
        this.contactorRequestList = res.content
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

  ngOnInit() {
    this.getContactorRequestList(this.pageNo)
  }
}