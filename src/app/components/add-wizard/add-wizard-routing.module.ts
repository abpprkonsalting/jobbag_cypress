import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddWizardComponent } from './add-wizard.component';
import { Step1Component } from './project-steps/step1/step1.component';
import { Step2Component } from './project-steps/step2/step2.component';
import { Step3Component } from './project-steps/step3/step3.component';
import { Step1Component as AccountStep1Component } from './create-account-steps/step1/step1.component';
import { Step2Component as AccountStep2Component } from './create-account-steps/step2/step2.component';
import { Step1Component as ConfigUserStep1Component } from './configure-user/step1/step1.component';
import { Step1aComponent as ConfigUserStep1aComponent } from './configure-user/step1a/step1a.component';
import { Step2Component as ConfigUserStep2Component } from './configure-user/step2/step2.component';
import { Step2aComponent as ConfigUserStep2aComponent } from './configure-user/step2a/step2a.component';
import { Step2bComponent as ConfigUserStep2bComponent } from './configure-user/step2b/step2b.component';
import { Step3Component as ConfigUserStep3Component } from './configure-user/step3/step3.component';
import { Step4Component as ConfigUserStep4Component } from './configure-user/step4/step4.component';
import { Step6Component as ConfigUserStep6Component } from './configure-user/step6/step6.component';
import { Step7Component as ConfigUserStep7Component } from './configure-user/step7/step7.component';
import { Step1Component as SignInStep1Component } from './sign-in/step1/step1.component';
import { Step2Component as SignInStep2Component } from './sign-in/step2/step2.component';
import { Step3Component as SignInStep3Component } from './sign-in/step3/step3.component';
import { Step4Component as SignInStep4Component } from './sign-in/step4/step4.component';

import {  AddWizardRoutingResolversProfessionsService,
          AddWizardRoutingResolversLocationsService,
          AddWizardRoutingResolversEmployeeService,
          AddWizardRoutingResolversEmployerService } from './add-wizard-routing-resolvers.services';

const routes: Routes  = [
  { path:  'add-project',
    component:  AddWizardComponent,
    data: {header: 'Nuevo Proyecto'},
    children: [
      {path: '1', component: Step1Component},
      {path: '2', component: Step2Component},
      {path: '3', component: Step3Component}
    ]
  },
  { path:  'create-account',
    component:  AddWizardComponent,
    data: {header: '', showNav: false},
    children: [
      {path: '1', component: AccountStep1Component},
      {path: '2', component: AccountStep2Component}
    ]
  },
  { path:  'configure-user',
    component:  AddWizardComponent,
    data: {header: '', showNav: true, linear: false},
    children: [
      {path: '1', component: ConfigUserStep1Component, data: {}},
      {path: '1a', component: ConfigUserStep1aComponent, data: {},
        resolve: { employeeData: AddWizardRoutingResolversEmployeeService, employerData: AddWizardRoutingResolversEmployerService} },
      {path: '2', component: ConfigUserStep2Component, data: {}},
      {path: '2a', component: ConfigUserStep2aComponent, data: {}, resolve: { employeeData: AddWizardRoutingResolversEmployeeService}},
      {path: '2b', component: ConfigUserStep2bComponent, data: {},
        resolve: { employeeData: AddWizardRoutingResolversEmployeeService, locations: AddWizardRoutingResolversLocationsService}},
      {path: '3', component: ConfigUserStep3Component, resolve: { professions: AddWizardRoutingResolversProfessionsService } },
      {path: '4', component: ConfigUserStep4Component, resolve: { professions: AddWizardRoutingResolversProfessionsService } },
      {path: '6', component: ConfigUserStep6Component, resolve: { employerData: AddWizardRoutingResolversEmployerService} },
      {path: '7', component: ConfigUserStep7Component, data: {}},
    ]
  },
  { path:  'sign-in',
    component:  AddWizardComponent,
    data: {header: '', showNav: true, linear: false},
    children: [
      {path: '1', component: SignInStep1Component, data: {}},
      {path: '2', component: SignInStep2Component, data: {}},
      {path: '3', component: SignInStep3Component, data: {}},
      {path: '4', component: SignInStep4Component, data: {}},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddWizardRoutingModule { }

