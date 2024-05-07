import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {User} from "../../models/User";
import {Contactor} from "../../models/Contactor";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private route: Router) {
  }

  link: string = "http://localhost:8080";

  public isLoggedIn(): boolean {
    return this.getToken() != null;
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token)
    this.route.navigate(['admin'])
  }

  public decodeToken(token: any): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/-/g, '/');
    const jsonPayLoad = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayLoad);
  }

  getToken(): string {
    return sessionStorage.getItem('token') as string
  }

  public login(user: User): Observable<any> {
    return this.http.post(this.link + "/auth/authenticate", user);
  }

  public register(user: User): Observable<any> {
    return this.http.post(this.link + "/auth/register", user);
  }

  public logout(): void {
    sessionStorage.clear();
    this.route.navigate(['login'])
  }

  public activateAccount(contactor: Contactor): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.put(this.link + "/auth/activate-account/contactor", contactor, {headers: head_obj})
  }

  public disableAccount(contactor: Contactor): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.put(this.link + "/auth/disable-account/contactor", contactor, {headers: head_obj})
  }

  public getAccountByEmail(email: string): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.get(this.link + "/auth/get/account/" + email, {headers: head_obj})
  }

  public deleteAccountByEmail(email: string): Observable<any> {
    let token = sessionStorage.getItem('token') as string;
    let head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.delete(this.link + "/auth/delete/" + email, {headers: head_obj});
  }
}
