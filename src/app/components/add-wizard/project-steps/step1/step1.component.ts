import { Component, OnInit } from '@angular/core';
import { professions } from '../../../../app-constants';
import { Subscriber } from '../../../custom-stepper/custom-stepper.component';

@Component({
  selector: 'step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.less']
})
export class Step1Component implements OnInit {

  professions: any[];

  constructor(protected messageSubscriber: Subscriber<Partial<any>>) {}

  ngOnInit() {
    this.professions = professions;
  }

  onCardClick(){
    this.messageSubscriber.next({value:"next"});
  }

}
