import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminLandingPageComponent} from "./admin-landing-page/admin-landing-page.component";
import {ListContactRequestComponent} from "./list-contact-request/list-contact-request.component";
import {ListContactorComponent} from "./list-contactor/list-contactor.component";
import {NewContactorComponent} from "./new-contactor/new-contactor.component";

const routes: Routes = [
  {
    path: "", component: AdminLandingPageComponent, children: [
      {path: "request-app", component: ListContactRequestComponent},
      {path: "contactor", component: ListContactorComponent},
      {path: "contactor/new", component: NewContactorComponent},
      {path: "", redirectTo: "request-app", pathMatch: "full"}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
