import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Contactor} from "../../models/Contactor";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactorService {

  constructor(private http: HttpClient) {
  }

  link: string = "http://localhost:8080"

  public saveContactor(contactor: Contactor): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.post(this.link + "/contactor/add", contactor, {headers: head_obj});
  }

  public updateContactor(contactor: Contactor): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.put(this.link + "/contactor/update", contactor, {headers: head_obj});
  }

  public deleteContactor(contactor: Contactor): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.delete(this.link + "/contactor/delete/" + contactor.id, {headers: head_obj});
  }

  public getContactorList(pageNo: number): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    const params = new URLSearchParams();
    params.set('pageNo', String(pageNo));
    params.set('pageSize', '12');
    return this.http.get(this.link + "/contactor/get?" + params.toString(), {headers: head_obj});
  }

  public getContactorListByFilter(pageNo: number, filter: string): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    const params = new URLSearchParams();
    params.set('pageNo', String(pageNo));
    params.set('pageSize', '12');
    params.set('filter', filter);
    return this.http.get(this.link + "/contactor/get/filter?" + params.toString(), {headers: head_obj});
  }

  public getContactorByEmail(email: string): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.get(this.link + "/contactor/get/by-email/" + email, {headers: head_obj});
  }
}
