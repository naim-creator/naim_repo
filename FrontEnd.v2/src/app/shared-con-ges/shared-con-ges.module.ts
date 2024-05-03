import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewDevisComponent} from './new-devis/new-devis.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    NewDevisComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    NewDevisComponent
  ]
})
export class SharedConGesModule {
}
