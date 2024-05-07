import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Activity} from "../../models/Activity";

@Injectable({
  providedIn: 'root'
})
export class CalenderService {

  constructor(private http: HttpClient) {
  }

  link: string = "http://localhost:8080";

  public getCalender(id: any): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set('Authorization', "Bearer " + token);
    return this.http.get(this.link + "/activity/get/" + id, {headers: head_obj});
  }

  public getCalenderActivity(id: any): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set('Authorization', "Bearer " + token);
    return this.http.get(this.link + "/activity/get/one/" + id, {headers: head_obj});
  }

  public addCalenderActivity(activity: Activity): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set('Authorization', "Bearer " + token);
    return this.http.post(this.link + "/activity/add", activity, {headers: head_obj});
  }

  public updateCalenderActivity(activity: Activity): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set('Authorization', "Bearer " + token);
    return this.http.put(this.link + "/activity/update", activity, {headers: head_obj});
  }

  public deleteCalenderActivity(id: any): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set('Authorization', "Bearer " + token);
    return this.http.delete(this.link + "/activity/delete/" + id, {headers: head_obj});
  }

  public getActivityById(id: any): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set('Authorization', "Bearer " + token);
    return this.http.get(this.link + "/activity/get/one/" + id, {headers: head_obj});
  }

}
