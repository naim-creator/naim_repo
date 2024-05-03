import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {ContactComponent} from "./pages/contact/contact.component";
import {adminGuardGuard} from "./guards/admin/admin-guard.guard";
import {contactorGuardGuard} from "./guards/contacor/contactor-guard.guard";

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "contact", component: ContactComponent},
  {
    path: "admin", canActivate: [adminGuardGuard],
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: "contactor", canActivate: [contactorGuardGuard],
    loadChildren: () => import('./contactor/contactor.module').then((m) => m.ContactorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
