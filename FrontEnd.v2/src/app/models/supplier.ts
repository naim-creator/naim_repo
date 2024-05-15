import {Company} from "./Company";

export interface Supplier {
  companyDto: Company;
  id?: any;
  firstName: string;
  lastName: string;
  supplierCompanyName: string;
  phone: string;
  email: string;
}
