import {Component, OnInit} from '@angular/core';
import {DevisRequestService} from "../../services/devis-request/devis-request.service";
import {DevisRequest} from "../../models/DevisRequest";
import {Router} from "@angular/router";
import {CustomerService} from "../../services/customer/customer.service";
import {Customer} from "../../models/Customer";

@Component({
  selector: 'app-new-devis-request',
  templateUrl: './new-devis-request.component.html',
  styleUrls: ['./new-devis-request.component.css']
})
export class NewDevisRequestComponent implements OnInit {

  constructor(private devisRequestService: DevisRequestService,
              private route: Router,
              private customerService:CustomerService) {
  }

  devisRequest: DevisRequest = {
    firstName: "", lastName: "", email: "", phone: "", building_type: "", location: "", post_code: "",
    roof_type: "", consumption: 0, electricity_access: false, available_area: 0, companyDto: {
      id: "", companyName: "", contactorDto: {
        id: "", firstName: "", lastName: "", address: "", email: "", phone: "",
        licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
      }, address: "", contact: ""
    }, status: "en attente"
  }
  customer:Customer={
    id:"",address:"",email:"",companyDto:{},phone:"",firstName:"",lastName:""
  }

  validFirstName: boolean = true;
  validLastName: boolean = true;
  validEmail: boolean = true;
  validRoof: boolean = true;
  validBuilding: boolean = true;
  validSurface: boolean = true;
  roofs: string[] = ["Toiture cintrée en berceau",
    "Toiture à 3 pans", "Toiture à 4 pans", "Toiture cintrée à simple courbure concave",
    "Toiture à demi-croupe normande", "Toiture à demi-croupe, croupe champenoise",
    "Toiture à demi-croupe débordante", "Toiture à demi-croupe", "Toiture pavillon",
    "Toiture papillon", "Toiture en L", "Toiture à 2 pans ou 2 versants", "Toiture en T", "Toiture à double courbure",
    "Toit monopente, à pupitre ou en appentis", "Toiture shed, à redans partiels ou en dents de scie", "Toiture à la Mansart avec terrasson, brisis et ligne de bris",
    "Toiture à coyers ou coyaux", "Tourelle conique à base circulaire", "Tourelle à pans à base hexagonale", "Toiture en dôme ou coupole"]
  buildings: string[] = ["industrielle spécialisée",
    "résidentiel", "commercial et institutionnel"]
  companyId: string = "";

  public saveDevisRequest(): void {
    this.checkLastNameValid()
    this.checkFirstNameValid()
    this.checkEmailValid()
    this.checkValidRoof()
    this.checkValidBuilding()
    this.checkValidSurface()
    if (this.validFirstName && this.validLastName && this.validEmail && this.validBuilding && this.validRoof && this.validSurface) {
      this.devisRequestService.addDevisRequest(this.devisRequest).subscribe({
        error: (err) => {
          if (err.status === 200) {
            this.route.navigate(['contactor/request-devis']).then(r => sessionStorage.setItem('message', err.error.text));
          }
        }
      })
      this.customerService.saveCustomer(this.customer).subscribe({
        error:(err)=>{
          if (err.status === 200) {
            this.route.navigate(['contactor/request-devis']).then(r => sessionStorage.setItem('message', err.error.text));
          }
        }
      })
    }
  }

  public selectRoof(event: any) {
    this.devisRequest.roof_type = event.target.value
  }

  public selectBuilding(event: any) {
    this.devisRequest.building_type = event.target.value
  }

  public selectAccess(event: any) {
    this.devisRequest.electricity_access = event.target.value
  }

  public checkFirstNameValid(): void {
    this.validFirstName = this.devisRequest.firstName !== "";
  }

  public checkLastNameValid(): void {
    this.validLastName = this.devisRequest.lastName !== "";
  }

  public checkEmailValid(): void {
    this.validEmail = this.devisRequest.email.slice(-10) == "@gmail.com";
  }

  public checkValidRoof(): void {
    this.validRoof = this.devisRequest.roof_type !== "";
  }

  public checkValidBuilding(): void {
    this.validBuilding = this.devisRequest.building_type !== "";
  }

  public checkValidSurface(): void {
    this.validSurface = this.devisRequest.available_area !== 0;
  }


  ngOnInit() {
    this.devisRequest.companyDto = JSON.parse(sessionStorage.getItem('company') as any);
  }
}
