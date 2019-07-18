import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectAddWizardComponent } from './components/project-add-wizard/project-add-wizard.component';


const routes: Routes = [
  { path: 'project-add-wizard', component: ProjectAddWizardComponent,data: {},
    /*children: [
      {
        path: 'step1',
        component: ProjectAddWizardComponent1,
        children: [],
      },
      {
        path: 'step2',
        component: ProjectAddWizardComponent2,
        children: [],
      }
    ]*/
  }]

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
