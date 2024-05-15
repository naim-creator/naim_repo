import {Component, OnInit} from '@angular/core';
import {CompanyService} from "../../services/company/company.service";
import {LicenceService} from "../../services/licence/licence.service";
import {Company} from "../../models/Company";
import {UserService} from "../../services/user/user.service";
import {Licence} from "../../models/Licence";

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  constructor(private service:CompanyService,
              private licenceService:LicenceService,
              private userService:UserService) {}

  companyList:Array<Company>=[];
  pageNo:number=0
  totalPages:number=0
  totalElements: number = 0
  duration:number=0
  licenceUpdate:boolean=true
  dataExist:boolean=false
  dataLoading:boolean=true
  filteredData:boolean=false
  accountActive: boolean = false
  sh:string=""
  updateLicenceMessage: any = "";
  errorMessage:string=""
  updateAccountMessage: any = "";
  goodRequest:boolean=true

  company:Company={
    id:"", address:"",contact:"",contactorDto:null,companyName:""
  }
  licence:Licence={
    status:"",startedAt:"",expiredAt:"",id:""
  }

  public search():void{
    this.getAllCompaniesFiltered(0,this.sh);
  }

  public getAllCompaniesFiltered(page:number,filter:string):void{
    this.dataLoading=true
    this.service.getCompaniesFiltered(page,filter).subscribe({
      next:(res)=>{
        this.companyList=res.content
        this.totalPages=res.totalPages
        this.totalElements = res.totalElements;
        this.filteredData=res.content.length!=0 && res.totalPages>1;
        this.dataLoading=false
        this.dataExist=true
        if (res.totalElements === 0) {
          this.dataExist = false;
        }
      }
    })
  }
  public getAllCompanies(page:number):void{
    this.dataLoading=true
    this.service.getCompanies(page).subscribe({
      next:(res)=>{
        this.companyList=res.content
        this.totalPages=res.totalPages
        this.totalElements = res.totalElements;
        this.dataExist=res.content.length !=0 && res.totalPages>1;
        this.dataLoading=false

      }
    })
  }
  public selectLicence(event: any): void {
    this.duration = Number(event.target.value);
    this.licenceUpdate = true;
  }

  public updateLicence(): void {
    this.accountActive=true
    this.licenceService.updateLicence(this.duration, this.company.contactorDto.licenceDto).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.updateLicenceMessage = err.error.text;
          this.getAllCompanies(this.pageNo)
        } else {
          this.updateLicenceMessage = "error est servenu";
        }
      }
    })
  }

  public updateCompany():void{
    this.service.updateCompany(this.company).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.errorMessage = "Donnée a été mise à jour";
        } else {
          this.errorMessage = "Un problème est servenu";
          this.goodRequest = false;
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
      default:{
        this.activateAccount()
      }
    }
  }
  public activateAccount(): void {
    this.userService.activateAccount(this.company.contactorDto.email).subscribe({
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
    this.userService.disableAccount(this.company.contactorDto.email).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.updateAccountMessage = err.error.text;
        } else {
          this.updateAccountMessage = "Un problème est servenu";
        }
      }
    })
  }
  public deleteCompany():void{
    this.service.deleteCompany(this.company).subscribe({
      error:(err)=>{
        if (err.status==200){
          this.errorMessage = "Donnée a été supprimer";
          this.goodRequest = true;
          this.getAllCompanies(this.pageNo)
        } else {
          this.errorMessage = "Un problème est servenu";
          this.goodRequest = false;
        }
      }
    })
  }

  public selectCompany(company:Company){
    this.company=company
  }

  public previousPage():void{
    if (this.pageNo>0){
      this.pageNo-=1
      if (!this.filteredData){
        this.getAllCompanies(this.pageNo)
      }else {
        this.getAllCompaniesFiltered(this.pageNo,this.sh)
      }
    }else {
      this.pageNo=this.totalPages-1
      if (!this.filteredData){
        this.getAllCompanies(this.pageNo)
      }else{
        this.getAllCompaniesFiltered(this.pageNo,this.sh)
      }
    }
  }
  public nextPage():void{
    if (this.pageNo>this.totalPages-1){
      this.pageNo-=1
      if (!this.filteredData){
        this.getAllCompanies(this.pageNo)
      }else {
        this.getAllCompaniesFiltered(this.pageNo,this.sh)
      }
    }else {
      this.pageNo=0
      if (!this.filteredData){
        this.getAllCompanies(this.pageNo)
      }else{
        this.getAllCompaniesFiltered(this.pageNo,this.sh)
      }
    }
  }

  ngOnInit() {
    this.getAllCompanies(this.pageNo);
    this.duration=this.company.contactorDto.duration
    this.activateAccount()
  }

}
