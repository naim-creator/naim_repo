import {MaterielBattery} from "./materiel-battery";
import {MaterielCable} from "./materiel-cable";
import {MaterielInverter} from "./materiel-inverter";
import {MaterielMeter} from "./materiel-meter";
import {MaterielSolarPanel} from "./materiel-solar-panel";
import {MaterielSystemFixing} from "./materiel-system-fixing";

export interface Devis {
  id?: any,
  battery: MaterielBattery;
  cable: MaterielCable;
  company?: { id: string };
  devisRequest ?: {id : string};
  date?: string;
  inverter: MaterielInverter;
  meter: MaterielMeter;
  ref?: string;
  solarPanel: MaterielSolarPanel;
  status?: string;
  systemFixing: MaterielSystemFixing;
  total?: number;
}
