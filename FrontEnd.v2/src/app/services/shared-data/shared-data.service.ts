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
    id: "", firstName: "", lastName: "", email: "", phone: "", address: "", company: null
  }

  worker: Worker = {
    id: "", firstName: "", lastName: "", address: "", email: "", phone: "", profession: "", image: "", company: {id: ""}
  }

  devisRequest: DevisRequest = {
    firstName: "", lastName: "", email: "", phone: "", building_type: "", location: "", post_code: "",
    roof_type: "", consumption: 0, electricity_access: false, available_area: 0, company: {id: ""}, status: "en attente"
  }
}
