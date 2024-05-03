import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Worker} from "../../models/Worker";

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(private http: HttpClient) {
  }

  link: string = "http://localhost:8080"

  public getWorkerListByCompany(pageNo: number, id: any): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    const params = new URLSearchParams();
    params.set('pageNo', String(pageNo));
    params.set('pageSize', '12');
    return this.http.get(this.link + "/worker/get/" + id + "?" + params.toString(), {headers: head_obj});
  }

  public getWorkerListByCompanyFiltered(filter: string, pageNo: number, id: any): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    const params = new URLSearchParams();
    params.set('pageNo', String(pageNo));
    params.set('pageSize', '12');
    params.set('filter', filter);
    return this.http.get(this.link + "/worker/get/filter/" + id + "?" + params.toString(), {headers: head_obj});
  }

  public getWorkerByEmail(email: string): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.get(this.link + "/worker/get/one/" + email, {headers: head_obj});
  }

  public addWorker(worker: Worker): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.post(this.link + "/worker/add", worker, {headers: head_obj});
  }

  public updateWorker(worker: Worker): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.put(this.link + "/worker/update", worker, {headers: head_obj});
  }

  public deleteWorker(worker: Worker): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.delete(this.link + "/worker/delete/" + worker.id, {headers: head_obj});
  }
}
