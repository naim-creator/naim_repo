import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CableService} from "../../services/cable/cable.service";
import {Cable} from "../../models/cable";

@Component({
  selector: 'app-new-cable',
  templateUrl: './new-cable.component.html',
  styleUrls: ['./new-cable.component.css']
})
export class NewCableComponent implements OnInit {
  constructor(private cableService: CableService,
              private route: Router) {
  }

  imageLink: string = "assets/solar%20panel.jpg";
  companyId: string = "";
  cable: Cable = {
    type: "", company: {id: ""}, model: "", section_transversal: "", image: "", price: 0, quantity: 0,
    material: "", isolation: "", diameter: 0, length: 0, resistance: 0, nominal_voltage: 0
  }

  public saveCable(): void {
    this.cable.company.id = this.companyId
    this.cableService.addCable(this.cable).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.route.navigate(['contactor/cable']).then(r => console.log(r));
        }
      }
    })
  }

  public handleFileInput(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageLink = e.target.result;
      this.cable.image = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  ngOnInit() {
    this.companyId = sessionStorage.getItem('company') as string;
  }
}
