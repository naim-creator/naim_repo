import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Inverter} from "../../models/inverter";

@Injectable({
  providedIn: 'root'
})
export class InverterService {

  constructor(private http: HttpClient) {
  }

  link: string = "http://localhost:8080"


  public getInverters(pageNo: number, id: any): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    const params = new URLSearchParams();
    params.set('pageNo', String(pageNo));
    params.set('pageSize', '12');
    return this.http.get(this.link + "/inverter/get/" + id + "?" + params.toString(), {headers: head_obj})
  }

  public getInvertersFiltered(pageNo: number, id: any, filter: string): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    const params = new URLSearchParams();
    params.set('pageNo', String(pageNo));
    params.set('pageSize', '12');
    params.set('filter', filter);
    return this.http.get(this.link + "/inverter/get/filter/" + id + "?" + params.toString(), {headers: head_obj})
  }

  public getInverterStockLevel(id: any): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.get(this.link + "/inverter/get/quantity/" + id, {headers: head_obj})
  }

  public addInverter(inverter: Inverter): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.post(this.link + "/inverter/add", inverter, {headers: head_obj})
  }

  public updateInverter(inverter: Inverter): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.put(this.link + "/inverter/update", inverter, {headers: head_obj})
  }

  public deleteInverter(id: any): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.delete(this.link + "/inverter/delete/" + id, {headers: head_obj})
  }
}
