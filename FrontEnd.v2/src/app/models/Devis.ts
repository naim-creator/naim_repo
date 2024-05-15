import {MaterielBattery} from "./materiel-battery";
import {MaterielCable} from "./materiel-cable";
import {MaterielInverter} from "./materiel-inverter";
import {MaterielMeter} from "./materiel-meter";
import {MaterielSolarPanel} from "./materiel-solar-panel";
import {MaterielSystemFixing} from "./materiel-system-fixing";
import {DevisRequest} from "./DevisRequest";
import {Company} from "./Company";

export interface Devis {
  idDevis?: any,
  battery: MaterielBattery;
  cable: MaterielCable;
  companyDto: Company;
  devisRequestDto : DevisRequest;
  date: any;
  inverter: MaterielInverter;
  meter: MaterielMeter;
  ref: string;
  solarPanel: MaterielSolarPanel;
  about: string;
  systemFixing: MaterielSystemFixing;
  total: number;
}
