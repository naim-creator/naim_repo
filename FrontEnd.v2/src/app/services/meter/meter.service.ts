import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cable} from "../../models/cable";
import {Meter} from "../../models/meter";

@Injectable({
  providedIn: 'root'
})
export class MeterService {

  constructor(private http: HttpClient) {
  }

  link: string = "http://localhost:8080";

  public getMeters(pageNo: number, id: any): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set('Authorization', "Bearer " + token);
    const params = new URLSearchParams();
    params.set('pageNo', pageNo.toString());
    params.set('pageSize', '12');
    return this.http.get(this.link + "/meter/get/" + id + "?" + params.toString(), {headers: head_obj});
  }

  public getMetersFiltered(pageNo: number, id: any, filter: string): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set('Authorization', "Bearer " + token);
    const params = new URLSearchParams();
    params.set('pageNo', pageNo.toString());
    params.set('pageSize', '12');
    params.set('filter', filter);
    return this.http.get(this.link + "/meter/get/filter/" + id + "?" + params.toString(), {headers: head_obj});
  }

  public getMetersStockLevel(id: any): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set('Authorization', "Bearer " + token);
    return this.http.get(this.link + "/meter/get/quantity/" + id, {headers: head_obj});
  }

  public addMeter(meter: Meter): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set('Authorization', "Bearer " + token);
    return this.http.post(this.link + "/meter/add", meter, {headers: head_obj});
  }

  public updateMeter(meter: Meter): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set('Authorization', "Bearer " + token);
    return this.http.put(this.link + "/meter/update", meter, {headers: head_obj});
  }

  public deleteMeter(id: any): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set('Authorization', "Bearer " + token);
    return this.http.delete(this.link + "/meter/delete/" + id, {headers: head_obj});
  }
}
