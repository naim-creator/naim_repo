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

  imageLink: string = "assets/noImage.jpg";
  validModel: boolean = true;
  validMaterial: boolean = true;
  validAdaptability: boolean = true;
  validInstallation: boolean = true;
  validWidth: boolean = true;
  validHeight: boolean = true;
  validCharge: boolean = true;
  validType: boolean = true;
  validPrice: boolean = true;
  companyId: string = ""
  systemFixing: SystemFixing = {
    companyDto: {
      id: "", companyName: "", contactorDto: {
        id: "", firstName: "", lastName: "", address: "", email: "", phone: "",
        licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
      }, address: "", contact: ""
    }, quantity: 0, charge: 0, image: "", type: "", installation_method: "", materiel: "",
    model: "", adaptability: "", height: 0, price: 0, width: 0
  }

  public checkValidModel(): void {
    this.validModel = this.systemFixing.model !== "";
  }

  public checkValidMaterial(): void {
    this.validMaterial = this.systemFixing.materiel !== "";
  }

  public checkValidAdaptability(): void {
    this.validAdaptability = this.systemFixing.adaptability !== "";
  }

  public checkValidInstallation(): void {
    this.validInstallation = this.systemFixing.installation_method !== "";
  }

  public checkValidWidth(): void {
    this.validWidth = this.systemFixing.width !== 0;
  }

  public checkValidHeight(): void {
    this.validHeight = this.systemFixing.height !== 0;
  }

  public checkValidCharge(): void {
    this.validCharge = this.systemFixing.charge !== 0;
  }

  public checkValidType(): void {
    this.validType = this.systemFixing.type !== "";
  }

  public checkValidPrice(): void {
    this.validPrice = this.systemFixing.price !== 0;
  }

  public saveSystemFixing(): void {
    this.checkValidModel();
    this.checkValidAdaptability();
    this.checkValidCharge();
    this.checkValidHeight();
    this.checkValidMaterial();
    this.checkValidInstallation();
    this.checkValidType();
    this.checkValidPrice();
    this.checkValidWidth();
    if (this.validPrice && this.validCharge && this.validType && this.validHeight && this.validWidth && this.validModel && this.validInstallation && this.validAdaptability && this.validMaterial) {
      this.systemFixing.companyDto.id = this.companyId;
      this.systemFixingService.addSystemFixing(this.systemFixing).subscribe({
        error: (err) => {
          if (err.status === 200) {
            this.route.navigate(['contactor/system-fixing']).then(r => sessionStorage.setItem('message', "système de fixation est ajouté"));
          }
        }
      })
    }
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
