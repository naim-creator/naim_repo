/* tslint:disable */

/* eslint-disable */
import {Company} from "./Company";

export interface Inverter {
  companyDto: Company;
  frequency: string;
  id?: any;
  image: string;
  maximum_circuit_voltage: number;
  minimal_circuit_current: number;
  model: string;
  nominal_power: number;
  phase_number: number;
  price: number;
  quantity: number;
  tension: number;
  type: string;
}
