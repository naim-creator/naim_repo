import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Battery} from "../../models/battery";

@Injectable({
  providedIn: 'root'
})
export class BatteryService {

  constructor(private http: HttpClient) {
  }

  link: string = "http://localhost:8080";

  public getBatteries(pageNo: number, id: any): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set('Authorization', "Bearer " + token);
    const params = new URLSearchParams();
    params.set('pageNo', pageNo.toString());
    params.set('pageSize', '12');
    return this.http.get(this.link + "/battery/get/" + id + '?' + params.toString(), {headers: head_obj});
  }

  public getBatteriesFiltered(pageNo: number, id: any, filter: string): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set('Authorization', "Bearer " + token);
    const params = new URLSearchParams();
    params.set('pageNo', pageNo.toString());
    params.set('pageSize', '12');
    params.set('filter', filter);
    return this.http.get(this.link + "/battery/get/filter/" + id + '?' + params.toString(), {headers: head_obj});
  }

  public getBatteriesStockLevel(id: any): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set('Authorization', "Bearer " + token);
    return this.http.get(this.link + "/battery/get/quantity/" + id, {headers: head_obj});
  }

  public addBattery(battery: Battery): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set('Authorization', "Bearer " + token);
    return this.http.post(this.link + "/battery/add", battery, {headers: head_obj});
  }

  public updateBattery(battery: Battery): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set('Authorization', "Bearer " + token);
    return this.http.put(this.link + "/battery/update", battery, {headers: head_obj});
  }

  public deleteBattery(id: any): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set('Authorization', "Bearer " + token);
    return this.http.delete(this.link + "/battery/delete/" + id, {headers: head_obj});
  }
}
