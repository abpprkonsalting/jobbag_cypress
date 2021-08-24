import { Component, OnInit, OnDestroy} from '@angular/core';
import { DragStepperMessagesHandle } from '../../../drag-stepper/drag-stepper.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WebStorageService} from '../../../../services/webstorage.service';
import { User } from '../../../../infrastructure/model/user.model';

@Component({
  selector: 'step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.less']
})
export class Step3Component implements OnInit, OnDestroy {
  formGroup: FormGroup;
  user: User;
  private stepperSubscriptionIndex;
  company: string = 'false';

  constructor(private formBuilder: FormBuilder, protected stepperMessagesHandle: DragStepperMessagesHandle<Partial<any>>, private webstorageService: WebStorageService) { }

  ngOnInit() {

    this.formGroup = this.formBuilder.group({name: [''], surname: [''],direccion: ['']});
    this.webstorageService.getUser().subscribe(
      next => {
        this.user = next;
        this.formGroup.controls.name.setValue(this.user.name);
        this.formGroup.controls.surname.setValue(this.user.surname);
        this.formGroup.controls.direccion.setValue('');
      },
      error => {
        console.log(error.message);
        this.user = new User();
      }
    );

    this.formGroup.statusChanges.subscribe(status => {  this.user.name = this.formGroup.controls.name.value;
                                                        this.user.surname = this.formGroup.controls.surname.value;
                                                        this.webstorageService.setUser(this.user).subscribe(u => this.user = u);
                                                      }
    );

    this.stepperMessagesHandle.next({value:"VALID"});

    this.stepperSubscriptionIndex = this.stepperMessagesHandle.subscribe(message =>
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
    this.company = $event.value;
    console.log(this.company);
  }

  ngOnDestroy() {
    if (this.stepperSubscriptionIndex != undefined) this.stepperMessagesHandle.unsubscribe(this.stepperSubscriptionIndex);
  }
}
