import {Licence} from "./Licence";

export interface Contactor {
  id?: any;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  licenceDto: Licence;
}
