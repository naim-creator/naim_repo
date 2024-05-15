import {Company} from "./Company";
import {Construction} from "./Construction";

export interface Customer {
  id?: any;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  companyDto: Company;
}
