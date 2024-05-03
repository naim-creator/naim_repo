import {Component} from '@angular/core';
import {WorkerService} from "../../services/worker/worker.service";
import {AuthService} from "../../services/authentication/auth.service";
import {ContactorService} from "../../services/contactor/contactor.service";
import {Router} from "@angular/router";
import {Contactor} from "../../models/Contactor";
import {Worker} from "../../models/Worker";
import {User} from "../../models/User";

@Component({
  selector: 'app-new-worker',
  templateUrl: './new-worker.component.html',
  styleUrls: ['./new-worker.component.css']
})
export class NewWorkerComponent {
  constructor(private workerService: WorkerService,
              private authService: AuthService,
              private contactorService: ContactorService,
              private route: Router) {
  }

  errorMessage: string = ""
  imageLink: string = "assets/profile.png"
  contactor: Contactor = {
    email: "", phone: "", firstName: "", lastName: "", address: "", company: {id: ""}
  }

  worker: Worker = {
    id: "", firstName: "", lastName: "", address: "", email: "", phone: "", profession: "", image: "", company: {id: ""}
  }

  user: User = {
    email: "", password: "", firstName: "", lastName: "", role: ""
  }

  public getContactorByEmail(): void {
    const token: string = sessionStorage.getItem('token') as string;
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
    let decodedToken = JSON.parse(jsonPayLoad);
    this.contactorService.getContactorByEmail(decodedToken.sub).subscribe({
      next: (res) => {
        this.contactor = res
      }
    })
  }

  public affectProfession(event: any): void {
    this.worker.profession = event.target.value
    this.user.role = event.target.value
  }

  public saveWorker(): void {
    this.user.firstName = this.worker.firstName
    this.user.lastName = this.worker.lastName
    this.user.email = this.worker.email
    this.worker.company = {id: String(this.contactor.company.id)}
    this.workerService.addWorker(this.worker).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.authService.register(this.user).subscribe({
            error: (err) => {
              if (err.status === 200) {

              } else {
                this.errorMessage = "Un problème est servenu"
              }
            }
          })
        } else {
          this.errorMessage = "Un problème est servenu"
        }
        this.route.navigate(['contactor/worker'])
      }
    })

  }

  public handleFileInput(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageLink = e.target.result;
      const base64String = reader.result as string;
      this.worker.image = base64String;
    };

    reader.readAsDataURL(file);
  }

  ngOnInit() {
    this.getContactorByEmail()
  }
}
