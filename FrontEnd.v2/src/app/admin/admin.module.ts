  import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { ListContactorComponent } from './list-contactor/list-contactor.component';
import { ListContactRequestComponent } from './list-contact-request/list-contact-request.component';
import { NewContactorComponent } from './new-contactor/new-contactor.component';
import { AdminLandingPageComponent } from './admin-landing-page/admin-landing-page.component';
import {FormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CompanyListComponent } from './company-list/company-list.component';



@NgModule({
  declarations: [
    AdminNavbarComponent,
    ListContactorComponent,
    ListContactRequestComponent,
    NewContactorComponent,
    AdminLandingPageComponent,
    CompanyListComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MatSlideToggleModule
  ]
})
export class AdminModule { }
