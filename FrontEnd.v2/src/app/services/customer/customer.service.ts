import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../../models/Customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  link: string = "http://localhost:8080";

  public getCustomersList(id: any, page: number): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    const param: URLSearchParams = new URLSearchParams()
    param.set('pageNo', String(page));
    param.set('pageSize', '12')
    return this.http.get(this.link + "/customer/get/" + id + '?' + param.toString(), {headers: head_obj});
  }

  public getCustomersListFiltered(id: any, page: number, filter: string): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    const param: URLSearchParams = new URLSearchParams()
    param.set('pageNo', String(page));
    param.set('pageSize', '12');
    param.set('filter', filter);
    return this.http.get(this.link + "/customer/get/filter/" + id + '?' + param.toString(), {headers: head_obj});
  }

  public saveCustomer(customer: Customer): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.post(this.link + "/customer/add", customer, {headers: head_obj});
  }

  public updateCustomer(customer: Customer): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.put(this.link + "/customer/update", customer, {headers: head_obj});
  }

  public deleteCustomer(id: any): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.delete(this.link + "/customer/delete/" + id, {headers: head_obj});
  }
}
