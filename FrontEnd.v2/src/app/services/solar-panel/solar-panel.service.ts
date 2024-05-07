import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {SolarPanel} from "../../models/solar-panel";

@Injectable({
  providedIn: 'root'
})
export class SolarPanelService {

  constructor(private http: HttpClient) {
  }

  link: string = "http://localhost:8080"

  public getSolarPanels(pageNo: number, id: any): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    const params = new URLSearchParams();
    params.set('pageNo', String(pageNo));
    params.set('pageSize', '12');
    return this.http.get(this.link + "/solarPanel/get/" + id + "?" + params.toString(), {headers: head_obj});
  }

  public getSolarPanelsFiltered(pageNo: number, id: any, filter: string): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    const params = new URLSearchParams();
    params.set('pageNo', String(pageNo));
    params.set('pageSize', '12');
    params.set('filter', filter);
    return this.http.get(this.link + "/solarPanel/get/filter/" + id + "?" + params.toString(), {headers: head_obj});
  }

  public getSolarPanelStockLevel(id: any): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.get(this.link + "/solarPanel/get/quantity/" + id, {headers: head_obj})
  }

  public addSolarPanels(solarPanel: SolarPanel): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.post(this.link + "/solarPanel/add", solarPanel, {headers: head_obj});
  }

  public updateSolarPanels(solarPanel: SolarPanel): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.put(this.link + "/solarPanel/update", solarPanel, {headers: head_obj});
  }

  public deleteSolarPanels(id: any): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.delete(this.link + "/solarPanel/delete/" + id, {headers: head_obj});
  }
}
