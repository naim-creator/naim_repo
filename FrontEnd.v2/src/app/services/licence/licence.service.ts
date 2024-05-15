import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Licence} from "../../models/Licence";

@Injectable({
  providedIn: 'root'
})
export class LicenceService {

  constructor(private http: HttpClient) {
  }

  link: string = "http://localhost:8080";

  public getLicenceList(pageNo: number): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    const params = new URLSearchParams();
    params.set('pageNo', String(pageNo));
    params.set('pageSize', '12');
    return this.http.get(this.link + "/licence/get" + '?' + params.toString(), {headers: head_obj});
  }

  public getLicenceListFiltered(pageNo: number, filter: string): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    const params = new URLSearchParams();
    params.set('pageNo', String(pageNo));
    params.set('pageSize', '12');
    params.set('filter', filter);
    return this.http.get(this.link + "/licence/get/filter" + '?' + params.toString(), {headers: head_obj});
  }

  public saveLicence(number: number): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.post(this.link + "/licence/add", number, {headers: head_obj});
  }

  public updateLicence(number: number, licence: Licence): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    const params = new URLSearchParams();
    params.set('number', String(number));
    return this.http.put(this.link + "/licence/update" + '?' + params.toString(), licence, {headers: head_obj});
  }

  public deleteLicence(id: any): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.delete(this.link + "/licence/delete/" + id, {headers: head_obj});
  }
}
