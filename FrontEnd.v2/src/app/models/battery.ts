/* tslint:disable */

/* eslint-disable */
import {Company} from "./Company";

export interface Battery {
  companyDto: Company;
  date_manufacture: string;
  id?: any;
  image: string;
  life_cycle: string;
  lifespan: string;
  maximum_discharge_voltage: number;
  maximum_load_voltage: number;
  model: string;
  nominal_voltage: number;
  operating_temperature: number;
  price: number;
  quantity: number;
  storage_capacity: number;
  type: string;
}
