import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DragStepperMessagesHandle } from '../../../drag-stepper/drag-stepper.component';

@Component({
  selector: 'step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.less']
})
export class Step1Component implements OnInit {
  firstFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, protected stepperMessagesHandle: DragStepperMessagesHandle<Partial<any>>) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required], secondCtrl: ['', Validators.required]
    });
  }

  onclick($event){
    if (this.firstFormGroup.status == 'VALID') {
          this.stepperMessagesHandle.next({value:"next"});
    }
  }

}
