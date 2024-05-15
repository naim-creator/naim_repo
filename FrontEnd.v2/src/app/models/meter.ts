/* tslint:disable */

/* eslint-disable */
import {Company} from "./Company";

export interface Meter {
  capacity: number;
  companyDto: Company;
  connexion_type?: string;
  id?: any;
  image: string;
  model: string;
  price: number;
  quantity: number;
  type: string;
}
