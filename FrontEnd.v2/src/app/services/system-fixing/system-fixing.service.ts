import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {SystemFixing} from "../../models/system-fixing";

@Injectable({
  providedIn: 'root'
})
export class SystemFixingService {

  constructor(private http: HttpClient) {
  }

  link: string = "http://localhost:8080";

  public getSystemFixing(pageNo: number, id: any): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    const params = new URLSearchParams();
    params.set('pageNo', String(pageNo));
    params.set('pageSize', '12');
    return this.http.get(this.link + "/systemFixing/get/" + id + "?" + params.toString(), {headers: head_obj});
  }

  public getSystemFixingFiltered(pageNo: number, id: any, filter: string): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    const params = new URLSearchParams();
    params.set('pageNo', String(pageNo));
    params.set('pageSize', '12');
    params.set('filter', filter);
    return this.http.get(this.link + "/systemFixing/get/filter/" + id + "?" + params.toString(), {headers: head_obj});
  }

  public getSystemFixingStockLevel(id: any): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.get(this.link + "/systemFixing/get/quantity/" + id, {headers: head_obj});
  }

  public addSystemFixing(systemFixing: SystemFixing): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.post(this.link + "/systemFixing/add", systemFixing, {headers: head_obj});
  }

  public updateSystemFixing(systemFixing: SystemFixing): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.put(this.link + "/systemFixing/update", systemFixing, {headers: head_obj});
  }

  public deleteSystemFixing(id: any): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.delete(this.link + "/systemFixing/delete/" + id, {headers: head_obj});
  }
}
