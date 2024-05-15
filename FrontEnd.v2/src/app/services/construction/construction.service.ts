import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Construction} from "../../models/Construction";

@Injectable({
  providedIn: 'root'
})
export class ConstructionService {

  constructor(private http: HttpClient) {
  }

  link: string = "http://localhost:8080"

  public getConstructionList(pageNo: number, id: any): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj: HttpHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const param: URLSearchParams = new URLSearchParams()
    param.set('pageNo', String(pageNo))
    param.set('pageSize', '12')
    return this.http.get(this.link + "/construction/get/" + id + '?' + param.toString(), {headers: head_obj});
  }

  public getConstructionListFiltered(pageNo: number, id: any, filter: string): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj: HttpHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const param: URLSearchParams = new URLSearchParams()
    param.set('pageNo', String(pageNo))
    param.set('pageSize', '12')
    param.set('search', filter)
    return this.http.get(this.link + "/construction/get/filter/" + id + '?' + param.toString(), {headers: head_obj});
  }

  public saveConstruction(construction: Construction): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj: HttpHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post(this.link + "/construction/add", construction, {headers: head_obj});
  }

  public updateConstruction(construction: Construction): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj: HttpHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.put(this.link + "/construction/update", construction, {headers: head_obj});
  }

  public deleteConstruction(id: any): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj: HttpHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.delete(this.link + "/construction/delete/" + id, {headers: head_obj});
  }
}
