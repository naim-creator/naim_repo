import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cable} from "../../models/cable";

@Injectable({
  providedIn: 'root'
})
export class CableService {

  constructor(private http: HttpClient) {
  }

  link: string = "http://localhost:8080";

  public getCables(pageNo: number, id: any): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set('Authorization', "Bearer " + token);
    const params = new URLSearchParams();
    params.set('pageNo', pageNo.toString());
    params.set('pageSize', '12');
    return this.http.get(this.link + "/cable/get/" + id + "?" + params.toString(), {headers: head_obj});
  }

  public getCablesFiltered(pageNo: number, id: any, filter: string): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set('Authorization', "Bearer " + token);
    const params = new URLSearchParams();
    params.set('pageNo', pageNo.toString());
    params.set('pageSize', '12');
    params.set('filter', filter);
    return this.http.get(this.link + "/cable/get/filter/" + id + "?" + params.toString(), {headers: head_obj});
  }

  public getCablesStockLevel(id: any): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set('Authorization', "Bearer " + token);
    return this.http.get(this.link + "/cable/get/quantity/" + id, {headers: head_obj});
  }

  public addCable(cable: Cable): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set('Authorization', "Bearer " + token);
    return this.http.post(this.link + "/cable/add", cable, {headers: head_obj});
  }

  public updateCable(cable: Cable): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set('Authorization', "Bearer " + token);
    return this.http.put(this.link + "/cable/update", cable, {headers: head_obj});
  }

  public deleteCable(id: any): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set('Authorization', "Bearer " + token);
    return this.http.delete(this.link + "/cable/delete/" + id, {headers: head_obj});
  }
}
