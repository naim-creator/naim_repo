import {Component, OnInit} from '@angular/core';
import {CompanyService} from "../../services/company/company.service";
import {LicenceService} from "../../services/licence/licence.service";
import {UserService} from "../../services/user/user.service";
import {Company} from "../../models/Company";
import {Licence} from "../../models/Licence";
import {CustomerService} from "../../services/customer/customer.service";
import {Customer} from "../../models/Customer";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit{


  constructor(private service:CustomerService,) {}

  customerList:Array<Customer>=[];
  pageNo:number=0
  totalPages:number=0
  totalElements: number = 0
  duration:number=0
  dataExist:boolean=false
  dataLoading:boolean=true
  filteredData:boolean=false
  sh:string=""
  id:any
  errorMessage:string=""
  goodRequest:boolean=true

  customer:Customer={
    id:"", address:"",phone:"",email:"",lastName:"",firstName:"",companyDto:{}
  }
  public search():void{
    this.getAllCustomersFiltered(this.id,0,this.sh);
  }

  public getAllCustomersFiltered(id:any,page:number,filter:string):void{
    this.dataLoading=true
    this.service.getCustomersListFiltered(id,page,filter).subscribe({
      next:(res)=>{
        this.customerList=res.content
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
  public getAllCustomers(id:any,page:number):void{
    this.dataLoading=true
    this.service.getCustomersList(id,page).subscribe({
      next:(res)=>{
        this.customerList=res.content
        this.totalPages=res.totalPages
        this.totalElements = res.totalElements;
        this.dataExist=res.content.length !=0 && res.totalPages>1;
        this.dataLoading=false

      }
    })
  }
  public updateCustomer():void{
    this.service.updateCustomer(this.customer).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.errorMessage = "Donnée a été mise à jour";
        } else {
          this.errorMessage = "Un problème est servenu";
          this.goodRequest = false;
        }
      }
    })
  }

  public deleteCustomer():void{
    this.service.deleteCustomer(this.customer).subscribe({
      error:(err)=>{
        if (err.status==200){
          this.errorMessage = "Donnée a été supprimer";
          this.goodRequest = true;
          this.getAllCustomers(this.id,this.pageNo)
        } else {
          this.errorMessage = "Un problème est servenu";
          this.goodRequest = false;
        }
      }
    })
  }

  public selectCustomer(customer:Customer){
    this.customer=customer
  }

  public previousPage():void{
    if (this.pageNo>0){
      this.pageNo-=1
      if (!this.filteredData){
        this.getAllCustomers(this.id,this.pageNo)
      }else {
        this.getAllCustomersFiltered(this.id,this.pageNo,this.sh)
      }
    }else {
      this.pageNo=this.totalPages-1
      if (!this.filteredData){
        this.getAllCustomers(this.id,this.pageNo)
      }else{
        this.getAllCustomersFiltered(this.id,this.pageNo,this.sh)
      }
    }
  }
  public nextPage():void{
    if (this.pageNo>this.totalPages-1){
      this.pageNo-=1
      if (!this.filteredData){
        this.getAllCustomers(this.id,this.pageNo)
      }else {
        this.getAllCustomersFiltered(this.id,this.pageNo,this.sh)
      }
    }else {
      this.pageNo=0
      if (!this.filteredData){
        this.getAllCustomers(this.id,this.pageNo)
      }else{
        this.getAllCustomersFiltered(this.id,this.pageNo,this.sh)
      }
    }
  }

  ngOnInit() {
    this.getAllCustomers(sessionStorage.getItem('customer') as string,this.pageNo)
  }

}
