import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DevisRequest} from "../../models/DevisRequest";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DevisRequestService {

  constructor(private http: HttpClient) {
  }

  link: string = "http://localhost:8080";


  public getDevisRequestByCompany(id: any, pageNo: number): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    const params = new URLSearchParams();
    params.set('pageNo', String(pageNo));
    params.set('pageSize', '12');
    return this.http.get(this.link + "/devisRequest/get/" + id + "?" + params.toString(), {headers: head_obj});
  }

  public getDevisRequestByCompanyFiltered(id: any, pageNo: number, filter: string): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    const params = new URLSearchParams();
    params.set('pageNo', String(pageNo));
    params.set('pageSize', '12');
    params.set('filter', filter);
    return this.http.get(this.link + "/devisRequest/get/filter/" + id + "?" + params.toString(), {headers: head_obj});
  }

  public getDevisRequestTotal(id: any): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.get(this.link + "/devisRequest/get/quantity/" + id, {headers: head_obj});
  }

  public addDevisRequest(devisRequest: DevisRequest): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.post(this.link + "/devisRequest/add", devisRequest, {headers: head_obj})
  }

  public updateDevisRequest(devisRequest: DevisRequest): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.put(this.link + "/devisRequest/update", devisRequest, {headers: head_obj})
  }

  public deleteDevisRequest(id: any): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.delete(this.link + "/devisRequest/delete/" + id, {headers: head_obj})
  }
}
