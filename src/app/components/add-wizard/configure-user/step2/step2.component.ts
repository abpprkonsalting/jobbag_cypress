import { Component, OnInit, OnDestroy} from '@angular/core';
import { DragStepperMessagesHandle } from '../../../drag-stepper/drag-stepper.component';
import {WebStorageService} from '../../../../services/webstorage.service';
import {HttpService} from '../../../../services/http.service';
import { User } from '../../../../infrastructure/model/user.model';

@Component({
  selector: 'step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.less']
})
export class Step2Component implements OnInit, OnDestroy {
  user: User;
  private _stepperSubscriptionIndex;

  constructor(protected stepperMessagesHandle: DragStepperMessagesHandle<Partial<any>>, private webstorageService: WebStorageService, private httpService: HttpService) { }

  ngOnInit() {

    this.webstorageService.getUser().subscribe(
      next => {
        this.user = next;console.log(this.user);
      },
      error => {
        console.log(error.message);
        this.user = new User();
      }
    );
    this.stepperMessagesHandle.next({value:"VALID"});

    this._stepperSubscriptionIndex = this.stepperMessagesHandle.subscribe(message =>
      {
        let messageType = typeof (message.value);
        if ( messageType == 'string') {
          switch (message.value) {
            case "stepperReceivedOrderNext":
              //this.onclick();
              break;
            default:
              break;
          }
        }
      }
    );
  }

  onSelection($event) {
    this.stepperMessagesHandle.next({value: parseInt($event.value)});
  }

  ngOnDestroy() {
    if (this._stepperSubscriptionIndex != undefined) this.stepperMessagesHandle.unsubscribe(this._stepperSubscriptionIndex);
  }
}
