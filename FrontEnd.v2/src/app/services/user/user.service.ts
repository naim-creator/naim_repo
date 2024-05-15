import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ChangePassword} from "../../models/ChangePassword";
import {User} from "../../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  link: string = "http://localhost:8080"

  public sendChangePasswordCode(email: string): Observable<any> {
    return this.http.post(this.link + "/users/send-code", email);
  }

  public confirmCode(code: string): Observable<any> {
    return this.http.post(this.link + "/users/confirm-code", code);
  }

  public changePassword(changePassword: ChangePassword): Observable<any> {
    return this.http.patch(this.link + "/users/change-password", changePassword);
  }

  public getAccount(email: String): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.get(this.link + "/users/get-account/" + email, {headers: head_obj});
  }

  public activateAccount(email: String): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.put(this.link + "/users/activate-account" , email, {headers: head_obj});
  }

  public disableAccount(email: String): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.put(this.link + "/users/disable-account", email, {headers: head_obj});
  }

  public deleteAccount(email: String): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.delete(this.link + "/users/delete-account/" + email, {headers: head_obj});
  }


}
