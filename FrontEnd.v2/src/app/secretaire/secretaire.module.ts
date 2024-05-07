import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecretaireRoutingModule } from './secretaire-routing.module';
import {SharedConSecModule} from "../shared-con-sec/shared-con-sec.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SecretaireRoutingModule,
    SharedConSecModule
  ]
})
export class SecretaireModule { }
