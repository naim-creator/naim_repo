import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {ContactComponent} from "./pages/contact/contact.component";
import {adminGuardGuard} from "./guards/admin/admin-guard.guard";
import {contactorGuardGuard} from "./guards/contacor/contactor-guard.guard";
import {ChangePasswordComponent} from "./pages/change-password/change-password.component";
import {LicenceExpiredComponent} from "./pages/licence-expired/licence-expired.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "contact", component: ContactComponent},
  {path: "login/forgetPassword", component: ChangePasswordComponent},
  {path: "licence-expired", component: LicenceExpiredComponent},
  {path: "not-found", component: NotFoundComponent},
  {
    path: "admin", canActivate: [adminGuardGuard],
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: "contactor", canActivate: [contactorGuardGuard],
    loadChildren: () => import('./contactor/contactor.module').then((m) => m.ContactorModule)
  },
  {path: "**", redirectTo: "not-found", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
