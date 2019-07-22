import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddWizardComponent } from './components/add-wizard/add-wizard.component';

const routes: Routes = [
  { path: 'add-project', component: AddWizardComponent },
  { path: 'create-account', component: AddWizardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
