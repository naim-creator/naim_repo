import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewDevisComponent} from './new-devis/new-devis.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CalenderComponent } from './calender/calender.component';
import { DevisComponent } from './devis/devis.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {RouterLink} from "@angular/router";
import { ConstructionComponent } from './construction/construction.component';
import { NewConstructionComponent } from './new-construction/new-construction.component';


@NgModule({
  declarations: [
    NewDevisComponent,
    CalenderComponent,
    DevisComponent,
    ConstructionComponent,
    NewConstructionComponent
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
