import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SystemFixingService} from "../../services/system-fixing/system-fixing.service";
import {SystemFixing} from "../../models/system-fixing";

@Component({
  selector: 'app-new-system-fixing',
  templateUrl: './new-system-fixing.component.html',
  styleUrls: ['./new-system-fixing.component.css']
})
export class NewSystemFixingComponent implements OnInit {
  constructor(private systemFixingService: SystemFixingService,
              private route: Router) {
  }

  imageLink: string = "assets/solar%20panel.jpg";
  companyId: string = ""
  systemFixing: SystemFixing = {
    company: {id: ""}, quantity: 0, charge: 0, image: "", type: "", installation_method: "", materiel: "",
    model: "", adaptability: "", height: 0, price: 0, width: 0
  }

  public saveSystemFixing(): void {
    this.systemFixing.company.id = this.companyId;
    this.systemFixingService.addSystemFixing(this.systemFixing).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.route.navigate(['contactor/system-fixing']).then(r => console.log(r));
        }
      }
    })
  }

  public handleFileInput(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageLink = e.target.result;
      const base64String = reader.result as string;
      this.systemFixing.image = base64String;
    };

    reader.readAsDataURL(file);
  }

  ngOnInit() {
    this.companyId = sessionStorage.getItem('company') as string;
  }
}
