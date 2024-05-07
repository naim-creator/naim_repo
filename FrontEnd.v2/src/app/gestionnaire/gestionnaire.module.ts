import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionnaireRoutingModule } from './gestionnaire-routing.module';
import {SharedConGesModule} from "../shared-con-ges/shared-con-ges.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GestionnaireRoutingModule,
    SharedConGesModule
  ]
})
export class GestionnaireModule { }
