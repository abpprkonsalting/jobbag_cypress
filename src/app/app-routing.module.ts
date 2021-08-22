import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddWizardComponent } from './components/add-wizard/add-wizard.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

import {RoutingResolversEmployeeService, RoutingResolversEmployerService } from './app-routing-resolvers.services';

const routes: Routes = [
  { path: 'add-project', component: AddWizardComponent },
  { path: 'create-account', component: AddWizardComponent,data:{} },
  { path: 'configure-user', component: AddWizardComponent },

  //{ path: '',component: LandingPageComponent,data:{},resolve: { employeeData: RoutingResolversEmployeeService, employerData: RoutingResolversEmployerService}  },
  { path: '',component: LandingPageComponent,data:{}},
  { path: '**', component: NotFoundPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
