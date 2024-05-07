import {Component, OnInit} from '@angular/core';
import {DevisRequestService} from "../../services/devis-request/devis-request.service";
import {DevisRequest} from "../../models/DevisRequest";
import {Router} from "@angular/router";
import {SharedDataService} from "../../services/shared-data/shared-data.service";
import {Contactor} from "../../models/Contactor";
import {Worker} from "../../models/Worker";
import {SolarPanel} from "../../models/solar-panel";
import {SolarPanelService} from "../../services/solar-panel/solar-panel.service";

@Component({
  selector: 'app-new-devis-request',
  templateUrl: './new-devis-request.component.html',
  styleUrls: ['./new-devis-request.component.css']
})
export class NewDevisRequestComponent implements OnInit {

  constructor(private devisRequestService: DevisRequestService,
              private route: Router) {
  }

  devisRequest: DevisRequest = {
    firstName: "", lastName: "", email: "", phone: "", building_type: "", location: "", post_code: "",
    roof_type: "", consumption: 0, electricity_access: false, available_area: 0, company: {id: ""}, status: "en attente"
  }

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
    this.devisRequest.company = {id: this.companyId}
    this.devisRequestService.addDevisRequest(this.devisRequest).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.route.navigate(['contactor/request-devis']).then(r => console.log(true));
        }
      }
    })
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


  ngOnInit() {
    this.companyId = sessionStorage.getItem('company') as string;
  }
}
