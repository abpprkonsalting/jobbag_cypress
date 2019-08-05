import { Component, OnInit, OnDestroy} from '@angular/core';
import { DragStepperMessagesHandle } from '../../../drag-stepper/drag-stepper.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WebStorageService} from '../../../../services/webstorage.service';
import {HttpService} from '../../../../services/http.service';
import { User } from '../../../../infrastructure/model/user.model';

@Component({
  selector: 'step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.less']
})
export class Step1Component implements OnInit, OnDestroy {
  formGroup: FormGroup;
  user: User;
  private _stepperSubscriptionIndex;

  constructor(private _formBuilder: FormBuilder, protected stepperMessagesHandle: DragStepperMessagesHandle<Partial<any>>, private webstorageService: WebStorageService, private httpService: HttpService) { }

  ngOnInit() {

    this.formGroup = this._formBuilder.group({name: [''], surname: ['']});
    this.webstorageService.getUser().subscribe(
      next => {
        this.user = next;
        this.formGroup.controls.name.setValue(this.user.name);
        this.formGroup.controls.surname.setValue(this.user.surname);
      },
      error => {
        console.log(error.message);
        this.user = new User();
      }
    );

    this.formGroup.statusChanges.subscribe(status => {  this.user.name = this.formGroup.controls.name.value;
                                                        this.user.surname = this.formGroup.controls.surname.value;
                                                        this.webstorageService.setUser(this.user);
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
