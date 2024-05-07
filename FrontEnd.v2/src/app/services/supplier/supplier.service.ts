import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Supplier} from "../../models/supplier";

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http:HttpClient) { }
  link:string="http://localhost:8080"

  public getSuppliersByCompany(pageNo:number,id:any):Observable<any>{
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    const params = new URLSearchParams();
    params.set('pageNo', String(pageNo));
    params.set('pageSize', '12');
    return this.http.get(this.link+"/supplier/get/"+id+"?"+params.toString(),{headers:head_obj})
  }

  public getSuppliersByCompanyFiltered(pageNo:number,id:any,filter:string):Observable<any>{
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    const params = new URLSearchParams();
    params.set('pageNo', String(pageNo));
    params.set('pageSize', '12');
    params.set('filter', filter);
    return this.http.get(this.link+"/supplier/get/filter/"+id+"?"+params.toString(),{headers:head_obj});
  }

  public addSupplier(supplier:Supplier):Observable<any>{
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.post(this.link+"/supplier/add",supplier,{headers:head_obj})
  }
  public updateSupplierByCompany(supplier:Supplier):Observable<any>{
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.put(this.link+"/supplier/update",supplier,{headers:head_obj});
  }
  public deleteSupplierByCompany(id:any):Observable<any>{
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.delete(this.link+"/supplier/delete"+id,{headers:head_obj});
  }
}
