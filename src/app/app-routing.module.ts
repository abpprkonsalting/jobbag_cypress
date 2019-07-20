import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectAddWizardComponent } from './components/project-add-wizard/project-add-wizard.component';

const routes: Routes = [
  { path: 'project-add-wizard', component: ProjectAddWizardComponent,data: {}}]

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
