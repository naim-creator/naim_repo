import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactorRoutingModule } from './contactor-routing.module';
import {SharedConGesModule} from "../shared-con-ges/shared-con-ges.module";
import {SharedConSecModule} from "../shared-con-sec/shared-con-sec.module";
import { ContactorNavbarComponent } from './contactor-navbar/contactor-navbar.component';
import { ListWorkerComponent } from './list-worker/list-worker.component';
import { NewWorkerComponent } from './new-worker/new-worker.component';
import { ContactorLandingPageComponent } from './contactor-landing-page/contactor-landing-page.component';
import { ContactorHomeComponent } from './contactor-home/contactor-home.component';
import {FormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {NgCircleProgressModule} from "ng-circle-progress";


@NgModule({
  declarations: [
    ContactorNavbarComponent,
    ListWorkerComponent,
    NewWorkerComponent,
    ContactorLandingPageComponent,
    ContactorHomeComponent
  ],
  imports: [
    CommonModule,
    ContactorRoutingModule,
    SharedConGesModule,
    SharedConSecModule,
    FormsModule,
    MatSlideToggleModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      units : '%',
      subtitle : 'de stock',
      subtitleFontSize : '16 px'
    })
  ]
})
export class ContactorModule { }
