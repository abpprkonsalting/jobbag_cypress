import { Component, OnInit, OnDestroy} from '@angular/core';
import { DragStepperMessagesHandle } from '../../../drag-stepper/drag-stepper.component';
import {WebStorageService} from '../../../../services/webstorage.service';
import { User } from '../../../../infrastructure/model/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.less']
})
export class Step2Component implements OnInit, OnDestroy {
  user: User;
  clickPosition: {
    x: number;
    y: number;
  } = {x: 0, y: 0};
  private stepperSubscriptionIndex: number;
  goToEmployee = true;

  constructor(protected stepperMessagesHandle: DragStepperMessagesHandle<Partial<any>>,
              private webstorageService: WebStorageService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.stepperMessagesHandle.next({value: 'INVALID'});

    this.webstorageService.getUser().subscribe(
      next => {
        this.user = next;
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
            case 'stepChanged':
              break;
            case 'stepperReceivedOrderNext':
              this.stepperMessagesHandle.next({value: 'VALID'});
              break;
            case 'stepperEnabled':
              if (this.goToEmployee) {
                this.stepperMessagesHandle.next({value: 'next'});
              } else {
                this.stepperMessagesHandle.next({value: 8});
              }
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
  onMouseUp(object) {
    if ((object.$event.x <= this.clickPosition.x + 10) && (object.$event.x >= this.clickPosition.x - 10) &&
        (object.$event.y <= this.clickPosition.y + 10) && (object.$event.y >= this.clickPosition.y - 10)) {

          if (object.selected === 'employer') { this.goToEmployee = false; }
          this.stepperMessagesHandle.next({value: 'VALID'});
    }
  }

  ngOnDestroy() {
    if (this.stepperSubscriptionIndex !== undefined) { this.stepperMessagesHandle.unsubscribe(this.stepperSubscriptionIndex); }
  }
}
