import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewDevisComponent} from './new-devis/new-devis.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CalenderComponent } from './calender/calender.component';
import { DevisComponent } from './devis/devis.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [
    NewDevisComponent,
    CalenderComponent,
    DevisComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatSlideToggleModule,
        RouterLink
    ],
  exports: [
    NewDevisComponent
  ]
})
export class SharedConGesModule {
}
