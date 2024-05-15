/* tslint:disable */

/* eslint-disable */
import {Company} from "./Company";

export interface Cable {
  companyDto: Company;
  diameter: number;
  id?: any;
  image: string;
  isolation: string;
  length: number;
  material: string;
  model: string;
  nominal_voltage: number;
  price: number;
  quantity: number;
  resistance: number;
  section_transversal: string;
  type: string;
}
