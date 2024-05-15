import {Injectable} from '@angular/core';
import {Contactor} from "../../models/Contactor";
import {Worker} from "../../models/Worker";
import {DevisRequest} from "../../models/DevisRequest";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() {
  }

  contactor: Contactor = {
    id: "", firstName: "", lastName: "", email: "", phone: "", address: "", licenceDto:{
      id: "", expiredAt: "", startedAt: "", status: ""
    }
  }

  worker: Worker = {
    id: "", firstName: "", lastName: "", address: "", email: "", phone: "", profession: "", image: "", companyDto: {
      id: "", companyName: "", contactorDto: {
        id: "", firstName: "", lastName: "", address: "", email: "", phone: "",
        licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
      }, address: "", contact: ""
    }
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
}
