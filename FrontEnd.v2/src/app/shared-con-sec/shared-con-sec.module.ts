import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevisRequestComponent } from './devis-request/devis-request.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NewDevisRequestComponent } from './new-devis-request/new-devis-request.component';
import { SolarPanelComponent } from './solar-panel/solar-panel.component';
import {NgCircleProgressModule} from "ng-circle-progress";
import { NewSolarPanelComponent } from './new-solar-panel/new-solar-panel.component';
import {RouterLink} from "@angular/router";
import { InverterComponent } from './inverter/inverter.component';
import { NewInverterComponent } from './new-inverter/new-inverter.component';
import { SystemFixingComponent } from './system-fixing/system-fixing.component';
import { NewSystemFixingComponent } from './new-system-fixing/new-system-fixing.component';



@NgModule({
  declarations: [
    DevisRequestComponent,
    NewDevisRequestComponent,
    SolarPanelComponent,
    NewSolarPanelComponent,
    InverterComponent,
    NewInverterComponent,
    SystemFixingComponent,
    NewSystemFixingComponent
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    FormsModule,
    NgCircleProgressModule,
    RouterLink
  ],
  exports:[
    NewDevisRequestComponent
  ]
})
export class SharedConSecModule { }
