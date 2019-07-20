import { FlexLayoutModule } from '@angular/flex-layout';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule,
  MatFormFieldModule, MatInputModule, MatSidenavModule, MatGridListModule,
  MatListModule, MatMenuModule, MatDialogModule, MatStepperModule } from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { LayoutModule } from '@angular/cdk/layout';

import { ProjectAddWizardRoutingModule } from './project-add-wizard-routing.module';
import { ProjectAddWizardComponent } from './project-add-wizard.component';
import { ProjectAddWizardStep1Component } from './project-add-wizard-step1/project-add-wizard-step1.component';
import { ProjectAddWizardStep2Component } from './project-add-wizard-step2/project-add-wizard-step2.component';
import { ProjectAddWizardStep3Component } from './project-add-wizard-step3/project-add-wizard-step3.component';
import { CustomStepperComponent } from '../custom-stepper/custom-stepper.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    ProjectAddWizardComponent,
    ProjectAddWizardStep1Component,
    ProjectAddWizardStep3Component,
    ProjectAddWizardStep2Component,
    CustomStepperComponent
  ],
  imports: [
    CommonModule,
    MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSidenavModule, MatGridListModule,
    MatListModule, MatMenuModule, MatDialogModule, MatStepperModule,
    ProjectAddWizardRoutingModule,FlexLayoutModule,DragDropModule,
    CdkStepperModule,LayoutModule, BrowserAnimationsModule
  ]
})
export class ProjectAddWizardModule { }


