import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Devis} from "../../models/Devis";

@Injectable({
  providedIn: 'root'
})
export class DevisService {

  constructor(private http: HttpClient) {
  }

  link: string = "http://localhost:8080"

  public getDevisList(pageNo: number, id: any): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj: HttpHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const params = new URLSearchParams();
    params.set('pageNo', String(pageNo));
    params.set('pageSize', '12');
    return this.http.get(this.link + "/devis/get/" + id + "?" + params.toString(), {headers: head_obj});
  }

  public getDevisListFiltered(pageNo: number, id: any, filter: string): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj: HttpHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const params = new URLSearchParams();
    params.set('pageNo', String(pageNo));
    params.set('pageSize', '12');
    params.set('filter', filter);
    return this.http.get(this.link + "/devis/get/filter/" + id + "?" + params.toString(), {headers: head_obj});
  }

  public addDevis(devis: Devis): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj: HttpHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post(this.link + "/devis/add", devis, {headers: head_obj});
  }

  public updateDevis(devis: Devis): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj: HttpHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.put(this.link + "/devis/update", devis, {headers: head_obj});
  }

  public deleteDevis(id: any): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj: HttpHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.delete(this.link + "/devis/delete/" + id, {headers: head_obj});
  }
}
