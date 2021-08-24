import { Component, OnInit, OnDestroy} from '@angular/core';
import { DragStepperMessagesHandle } from '../../../drag-stepper/drag-stepper.component';
import {WebStorageService} from '../../../../services/webstorage.service';
import { User } from '../../../../infrastructure/model/user.model';
import { Profession } from '../../../../infrastructure/model/profession.model';
import { ActivatedRoute } from '@angular/router';

import { professions } from '../../../../app-constants';

@Component({
  selector: 'step7',
  templateUrl: './step7.component.html',
  styleUrls: ['./step7.component.less']
})
export class Step7Component implements OnInit, OnDestroy {
  user: User;
  clickPosition: {
    x: number;
    y: number;
  } = {x: 0, y: 0};
  private stepperSubscriptionIndex: number;

  constructor(protected stepperMessagesHandle: DragStepperMessagesHandle<Partial<any>>,
              private webstorageService: WebStorageService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.webstorageService.getUser().subscribe(
      next => {
        this.user = next;
        console.log(this.user);
      },
      error => {
        console.log(error.message);
        this.user = new User();
      }
    );

    this.stepperSubscriptionIndex = this.stepperMessagesHandle.subscribe(message => {
        const messageType = typeof (message.value);
        if ( messageType === 'string') {
          switch (message.value) {
            case 'stepperReceivedOrderNext':
              break;
            default:
              break;
          }
        }
      }
    );
  }

  onmousedown($event) {
    this.clickPosition.x = $event.x;
    this.clickPosition.y = $event.y;
    // this.stepperMessagesHandle.next({value:"next"});
  }
  onMouseUp($event) {
    if (($event.x <= this.clickPosition.x + 10) && ($event.x >= this.clickPosition.x - 10) &&
        ($event.y <= this.clickPosition.y + 10) && ($event.y >= this.clickPosition.y - 10)) {
          console.log(this.user);
          this.webstorageService.setUser(this.user, true).subscribe(u => {this.user = u; console.log(this.user); });

    }
  }

  ngOnDestroy() {
    if (this.stepperSubscriptionIndex !== undefined) { this.stepperMessagesHandle.unsubscribe(this.stepperSubscriptionIndex); }
  }
}
