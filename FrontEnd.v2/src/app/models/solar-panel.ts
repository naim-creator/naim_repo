/* tslint:disable */
/* eslint-disable */
import {Company} from "./Company";

export interface SolarPanel {
  companyDto: Company;
  height: number;
  id?: any;
  image: string;
  maximum_current: number;
  maximum_voltage: number;
  model: string;
  nominal_power: number;
  price: number;
  quantity: number;
  type_cell: string;
  weight: number;
  width: number;
}
