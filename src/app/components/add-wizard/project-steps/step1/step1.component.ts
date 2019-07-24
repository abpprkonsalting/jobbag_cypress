import { Component, OnInit } from '@angular/core';
import { professions } from '../../../../app-constants';
import { DragStepperMessagesHandle } from '../../../drag-stepper/drag-stepper.component';

@Component({
  selector: 'step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.less']
})
export class Step1Component implements OnInit {

  professions: any[];

  constructor(protected stepperMessagesHandle: DragStepperMessagesHandle<Partial<any>>) {}

  ngOnInit() {
    this.professions = professions;
  }

  onCardClick(){
    this.stepperMessagesHandle.next({value:"next"});
  }

}
