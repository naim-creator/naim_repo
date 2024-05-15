import {Devis} from "./Devis";
import {Customer} from "./Customer";
import {Company} from "./Company";

export interface Construction {
  id?: any;
  description: string;
  location: string;
  companyDto: Company;
  devisDto: Devis;
  customerDto: Customer;
}
