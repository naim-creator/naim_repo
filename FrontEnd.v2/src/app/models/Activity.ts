import {Construction} from "./Construction";
import {Company} from "./Company";

export interface Activity {
  id?: any;
  start_date: string;
  end_date: string;
  text: string;
  workerDtoList: Array<any>;
  constructionDto: Construction;
  companyDto: Company;
}
