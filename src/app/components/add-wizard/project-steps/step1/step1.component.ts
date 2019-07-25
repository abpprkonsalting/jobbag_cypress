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
  clickPosition: {
    x: number;
    y: number;
  } = {x:0,y:0};

  constructor(protected stepperMessagesHandle: DragStepperMessagesHandle<Partial<any>>) {}

  ngOnInit() {
    this.professions = professions;
  }

  onmousedown($event){
    this.clickPosition.x = $event.x;
    this.clickPosition.y = $event.y;
    //this.stepperMessagesHandle.next({value:"next"});
  }
  onMouseUp($event){
    if (($event.x <= this.clickPosition.x + 10) && ($event.x >= this.clickPosition.x - 10) &&
        ($event.y <= this.clickPosition.y + 10) && ($event.y >= this.clickPosition.y - 10)) {
          this.stepperMessagesHandle.next({value:"next"});
    }
  }
}
