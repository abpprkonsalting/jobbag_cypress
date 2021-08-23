import { Component, OnInit, OnDestroy} from '@angular/core';
import { DragStepperMessagesHandle } from '../../../drag-stepper/drag-stepper.component';
import {WebStorageService} from '../../../../services/webstorage.service';
import { User } from '../../../../infrastructure/model/user.model';
import { constants } from '../../../../app-constants';
import {HttpService} from '../../../../services/http.service.dev';

@Component({
  selector: 'step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.less']
})
export class Step4Component implements OnInit, OnDestroy {
  private httpService: any;
  user: User = new User();
  private _stepperSubscriptionIndex;
  nextStep: number;
  uploadUrl = "";
  userImgUrl = new Array();

  constructor(protected stepperMessagesHandle: DragStepperMessagesHandle<Partial<any>>, private webstorageService: WebStorageService, httpService: HttpService) {
    this.httpService = httpService;
    this.uploadUrl = constants.apiUrl + 'user/uploadUserImage';
  }

  ngOnInit() {

    this.webstorageService.getUser().subscribe(
      next => {
        this.user = next;
        console.log(this.user);
        if (this.user.imageUrl != "") {
          this.userImgUrl.push(constants.apiUrl + this.user.imageUrl);
        }
      },
      error => {
        console.log(error.message);
        this.user = new User();
      }
    );

    this.stepperMessagesHandle.next({value:"RETURNBACK"});

    this._stepperSubscriptionIndex = this.stepperMessagesHandle.subscribe(message =>
      {
        let messageType = typeof (message.value);
        if ( messageType == 'string') {
          switch (message.value) {
            case "stepperReceivedOrderNext":
              this.stepperMessagesHandle.next({value:this.nextStep});
              break;
            case "stepperReceivedOrderPrev":
              this.stepperMessagesHandle.next({value:"CANCELHISTORY"});
              this.stepperMessagesHandle.next({value:"prev"});
              break;
            default:
              break;
          }
        }
      }
    );
  }

  onUploadFinished($event) {
    if ($event.serverResponse != undefined && $event.serverResponse.response != undefined && $event.serverResponse.response.body != undefined) {
      this.user.imageUrl = $event.serverResponse.response.body;
    }
  }

  onRemoved($event) {
    if ($event.src != (constants.apiUrl + this.user.imageUrl)) {
      let t = this.user.imageUrl.split("/");
      if (t.length == 3 && t[0] == "images" && t[1] == "users") {
        this.httpService.clearUserImage(t[2]).subscribe(result => {
          console.log(result);
          this.user.imageUrl = undefined;
          console.log(this.user);
        });
      }
    }
    else this.user.imageUrl = undefined;
  }

  ngOnDestroy() {
    if (this._stepperSubscriptionIndex != undefined) this.stepperMessagesHandle.unsubscribe(this._stepperSubscriptionIndex);
  }
}
