import {Construction} from "./Construction";
import {Worker} from "./Worker";

export interface Activity {
  id?: any;
  start_date?: string;
  end_date?: string;
  text: string;
  workers: Array<any>;
  construction?: { id: string };
  company: { id: string };
}
