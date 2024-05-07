import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ContactorRequest} from "../../models/ContactorRequest";

@Injectable({
  providedIn: 'root'
})
export class ContactRequestService {

  constructor(private http: HttpClient) {
  }

  link: string = "http://localhost:8080"

  public saveContactorRequest(contactorRequest: ContactorRequest): Observable<any> {
    return this.http.post(this.link + "/contactorRequest/add", contactorRequest);
  }

  public updateContactorRequest(contactorRequest: ContactorRequest): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.put(this.link + "/contactorRequest/update", contactorRequest, {headers: head_obj});
  }

  public deleteContactorRequest(contactorRequest: ContactorRequest): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    let id: any = contactorRequest.id
    return this.http.delete(this.link + "/contactorRequest/delete/" + id, {headers: head_obj});
  }

  public getContactorRequestList(pageNo: number): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    const params = new URLSearchParams();
    params.set('pageNo', String(pageNo));
    params.set('pageSize', '12');
    return this.http.get(this.link + "/contactorRequest/get?" + params.toString(), {headers: head_obj});
  }

  public getContactorRequestListByFilter(pageNo: number, filter: string): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    const params = new URLSearchParams();
    params.set('pageNo', String(pageNo));
    params.set('pageSize', '12');
    params.set('filter', filter)
    return this.http.get(this.link + "/contactorRequest/get/filter?" + params.toString(), {headers: head_obj});
  }
}
