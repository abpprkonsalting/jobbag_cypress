import { Component, OnInit, OnDestroy} from '@angular/core';
import { DragStepperMessagesHandle } from '../../../drag-stepper/drag-stepper.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WebStorageService} from '../../../../services/webstorage.service';
import { User } from '../../../../infrastructure/model/user.model';

@Component({
  selector: 'step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.less']
})
export class Step1Component implements OnInit, OnDestroy {
  user: User;
  private stepperSubscriptionIndex;

  constructor(protected stepperMessagesHandle: DragStepperMessagesHandle<Partial<any>>, private webStorageService: WebStorageService) { }

  ngOnInit() {

    this.stepperMessagesHandle.next({value: 'VALID'});

    this.stepperSubscriptionIndex = this.stepperMessagesHandle.subscribe(message => {
        const messageType = typeof (message.value);
        if ( messageType === 'string') {
          switch (message.value) {
            default:
              break;
          }
        }
      }
    );
  }

  facebookLogin() {
    this.webStorageService.loginFacebook();
  }

  next() {
    this.stepperMessagesHandle.next({value: 'next'});
  }

  ngOnDestroy() {
    if (this.stepperSubscriptionIndex !== undefined) { this.stepperMessagesHandle.unsubscribe(this.stepperSubscriptionIndex); }
  }
}
