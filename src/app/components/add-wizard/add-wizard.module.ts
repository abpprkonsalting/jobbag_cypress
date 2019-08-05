import { FlexLayoutModule } from '@angular/flex-layout';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule,
  MatFormFieldModule, MatInputModule, MatSidenavModule, MatGridListModule,
  MatListModule, MatMenuModule, MatDialogModule, MatStepperModule,MatRadioModule,MatExpansionModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { LayoutModule } from '@angular/cdk/layout';

import { AddWizardRoutingModule } from './add-wizard-routing.module';
import { AddWizardComponent } from './add-wizard.component';
import { Step1Component } from './project-steps/step1/step1.component';
import { Step2Component } from './project-steps/step2/step2.component';
import { Step3Component } from './project-steps/step3/step3.component';
import { Step1Component as AccountStep1Component } from './create-account-steps/step1/step1.component';
import { Step2Component as AccountStep2Component } from './create-account-steps/step2/step2.component';
import { Step1Component as ConfigUserStep1Component } from './configure-user/step1/step1.component';
import { Step2Component as ConfigUserStep2Component } from './configure-user/step2/step2.component';
import { Step3Component as ConfigUserStep3Component } from './configure-user/step3/step3.component';
import { Step4Component as ConfigUserStep4Component } from './configure-user/step4/step4.component';
import { Step5Component as ConfigUserStep5Component } from './configure-user/step5/step5.component';
import { DragStepperComponent} from '../drag-stepper/drag-stepper.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AddWizardComponent,
    Step1Component,
    Step3Component,
    Step2Component,
    AccountStep1Component,
    AccountStep2Component,
    ConfigUserStep1Component,
    ConfigUserStep2Component,
    ConfigUserStep3Component,
    ConfigUserStep4Component,
    ConfigUserStep5Component,
    DragStepperComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSidenavModule, MatGridListModule,
    MatListModule, MatMenuModule, MatDialogModule, MatStepperModule,
    AddWizardRoutingModule,FlexLayoutModule,DragDropModule,MatRadioModule,
    CdkStepperModule,LayoutModule, BrowserAnimationsModule,FormsModule, ReactiveFormsModule,
    MatExpansionModule
  ]
})
export class AddWizardModule { }


