import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) {
  }

  link: string = "http://localhost:8080";

  public sendMail(mail: FormData): Observable<any> {
    let token: string = sessionStorage.getItem('token') as string;
    let head_obj: HttpHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<Blob>(this.link + "/mail/send", mail, {headers: head_obj});
  }
}
