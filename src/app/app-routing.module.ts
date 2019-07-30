import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddWizardComponent } from './components/add-wizard/add-wizard.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: 'add-project', component: AddWizardComponent },
  { path: 'create-account', component: AddWizardComponent },

  { path: '',component: LandingPageComponent },
  { path: '**', component: NotFoundPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
