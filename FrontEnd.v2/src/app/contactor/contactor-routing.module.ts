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
import {CalenderComponent} from "../shared-con-ges/calender/calender.component";
import {CableComponent} from "../shared-con-sec/cable/cable.component";
import {NewCableComponent} from "../shared-con-sec/new-cable/new-cable.component";
import {BatteryComponent} from "../shared-con-sec/battery/battery.component";
import {NewBatteryComponent} from "../shared-con-sec/new-battery/new-battery.component";
import {MeterComponent} from "../shared-con-sec/meter/meter.component";
import {NewMeterComponent} from "../shared-con-sec/new-meter/new-meter.component";
import {DevisComponent} from "../shared-con-ges/devis/devis.component";
import {SupplierComponent} from "../shared-con-sec/supplier/supplier.component";
import {ConstructionComponent} from "../shared-con-ges/construction/construction.component";
import {NewConstructionComponent} from "../shared-con-ges/new-construction/new-construction.component";
import {CustomerComponent} from "../shared-con-sec/customer/customer.component";
const routes: Routes = [
  {
    path: "", component: ContactorLandingPageComponent, children: [
      {path: "home", component: ContactorHomeComponent},
      {path: "worker", component: ListWorkerComponent},
      {path: "worker/new", component: NewWorkerComponent},
      {path: "request-devis", component: DevisRequestComponent},
      {path: "request-devis/new", component: NewDevisRequestComponent},
      {path: "devis", component: DevisComponent},
      {path: "devis/new", component: NewDevisComponent},
      {path: "solar-panel", component: SolarPanelComponent},
      {path: "solar-panel/new", component: NewSolarPanelComponent},
      {path: "inverter", component: InverterComponent},
      {path: "inverter/new", component: NewInverterComponent},
      {path: "system-fixing", component: SystemFixingComponent},
      {path: "system-fixing/new", component: NewSystemFixingComponent},
      {path: "calender", component: CalenderComponent},
      {path: "cable", component: CableComponent},
      {path: "cable/new", component: NewCableComponent},
      {path: "battery", component: BatteryComponent},
      {path: "battery/new", component: NewBatteryComponent},
      {path: "meter", component: MeterComponent},
      {path: "meter/new", component: NewMeterComponent},
      {path: "supplier", component: SupplierComponent},
      {path: "construction", component: ConstructionComponent},
      {path: "construction/new", component: NewConstructionComponent},
      {path:"customer",component:CustomerComponent},
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
