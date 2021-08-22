import { FlexLayoutModule } from '@angular/flex-layout';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule,
  MatFormFieldModule, MatInputModule, MatSidenavModule, MatGridListModule,MatProgressBarModule,
  MatListModule, MatMenuModule, MatDialogModule, MatStepperModule,MatRadioModule,MatExpansionModule, MatCheckboxModule  } from '@angular/material';
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
import { DragStepperComponent} from '../drag-stepper/drag-stepper.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageUploadModule } from "angular2-image-upload";

@NgModule({
  declarations: [
    AddWizardComponent,
    Step1Component,
    Step3Component,
    Step2Component,
    AccountStep1Component,
    AccountStep2Component,
    ConfigUserStep1Component,
    ConfigUserStep1aComponent,
    ConfigUserStep2Component,
    ConfigUserStep2aComponent,
    ConfigUserStep2bComponent,
    ConfigUserStep7Component,
    ConfigUserStep3Component,
    ConfigUserStep4Component,
    ConfigUserStep6Component,
    ConfigUserStep7Component,
    SignInStep1Component,
    SignInStep2Component,
    SignInStep3Component,
    SignInStep4Component,
    DragStepperComponent,
  ],
  imports: [
    CommonModule,MatProgressBarModule,
    MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSidenavModule, MatGridListModule,
    MatListModule, MatMenuModule, MatDialogModule, MatStepperModule,
    AddWizardRoutingModule,FlexLayoutModule,DragDropModule,MatRadioModule,
    CdkStepperModule,LayoutModule, BrowserAnimationsModule,FormsModule, ReactiveFormsModule,
    MatExpansionModule, MatCheckboxModule,ImageUploadModule.forRoot()
  ]
})
export class AddWizardModule { }


