import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectAddWizardComponent } from './project-add-wizard.component';
import { ProjectAddWizardStep1Component } from './project-add-wizard-step1/project-add-wizard-step1.component';
import { ProjectAddWizardStep2Component } from './project-add-wizard-step2/project-add-wizard-step2.component';
import { ProjectAddWizardStep3Component } from './project-add-wizard-step3/project-add-wizard-step3.component';


const routes:  Routes  = [
  {
  path:  'project-add-wizard',
  component:  ProjectAddWizardComponent,
  children: [
  {
    path: 'step1',
    component: ProjectAddWizardStep1Component
  },
  {
    path: 'step2',
    component: ProjectAddWizardStep2Component
  },
  {
    path: 'step3',
    component: ProjectAddWizardStep3Component
  }]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectAddWizardRoutingModule { }

