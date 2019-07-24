import { FlexLayoutModule } from '@angular/flex-layout';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule,
  MatFormFieldModule, MatInputModule, MatSidenavModule, MatGridListModule,
  MatListModule, MatMenuModule, MatDialogModule, MatStepperModule } from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { LayoutModule } from '@angular/cdk/layout';

import { AddWizardRoutingModule } from './add-wizard-routing.module';
import { AddWizardComponent } from './add-wizard.component';
import { Step1Component } from './project-steps/step1/step1.component';
import { Step2Component } from './project-steps/step2/step2.component';
import { Step3Component } from './project-steps/step3/step3.component';
import { Step1Component as AccountStep1Component } from './create-account-steps/step1/step1.component';
import { DragStepperComponent } from '../drag-stepper/drag-stepper.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AddWizardComponent,
    Step1Component,
    Step3Component,
    Step2Component,
    AccountStep1Component,
    DragStepperComponent
  ],
  imports: [
    CommonModule,
    MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSidenavModule, MatGridListModule,
    MatListModule, MatMenuModule, MatDialogModule, MatStepperModule,
    AddWizardRoutingModule,FlexLayoutModule,DragDropModule,
    CdkStepperModule,LayoutModule, BrowserAnimationsModule
  ]
})
export class AddWizardModule { }


