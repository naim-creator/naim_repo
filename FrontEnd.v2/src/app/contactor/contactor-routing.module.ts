import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactorLandingPageComponent} from "./contactor-landing-page/contactor-landing-page.component";
import {ListWorkerComponent} from "./list-worker/list-worker.component";
import {NewWorkerComponent} from "./new-worker/new-worker.component";
import {ContactorHomeComponent} from "./contactor-home/contactor-home.component";
import {DevisRequestComponent} from "../shared-con-sec/devis-request/devis-request.component";
import {NewDevisRequestComponent} from "../shared-con-sec/new-devis-request/new-devis-request.component";
import {NewDevisComponent} from "../shared-con-ges/new-devis/new-devis.component";
import {SolarPanelComponent} from "../shared-con-sec/solar-panel/solar-panel.component";
import {NewSolarPanelComponent} from "../shared-con-sec/new-solar-panel/new-solar-panel.component";
import {InverterComponent} from "../shared-con-sec/inverter/inverter.component";
import {NewInverterComponent} from "../shared-con-sec/new-inverter/new-inverter.component";
import {SystemFixingComponent} from "../shared-con-sec/system-fixing/system-fixing.component";
import {NewSystemFixingComponent} from "../shared-con-sec/new-system-fixing/new-system-fixing.component";

const routes: Routes = [
  {
    path: "", component: ContactorLandingPageComponent, children: [
      {path: "home", component: ContactorHomeComponent},
      {path: "worker", component: ListWorkerComponent},
      {path: "worker/new", component: NewWorkerComponent},
      {path: "request-devis", component: DevisRequestComponent},
      {path: "request-devis/new", component: NewDevisRequestComponent},
      {path: "devis/new", component: NewDevisComponent},
      {path: "solar-panel", component: SolarPanelComponent},
      {path: "solar-panel/new", component: NewSolarPanelComponent},
      {path: "inverter", component: InverterComponent},
      {path: "inverter/new", component: NewInverterComponent},
      {path: "system-fixing", component: SystemFixingComponent},
      {path: "system-fixing/new", component: NewSystemFixingComponent},
      {path: "", redirectTo: "home", pathMatch: "full"}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactorRoutingModule {
}
