import { Component, OnInit, OnDestroy} from '@angular/core';
import { DragStepperMessagesHandle } from '../../../drag-stepper/drag-stepper.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WebStorageService} from '../../../../services/webstorage.service';
import { User } from '../../../../infrastructure/model/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'step1a',
  templateUrl: './step1a.component.html',
  styleUrls: ['./step1a.component.less']
})
export class Step1aComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  user: User;
  private _stepperSubscriptionIndex;
  company: string = 'false';
  nextStep: number;

  constructor(private _formBuilder: FormBuilder, protected stepperMessagesHandle: DragStepperMessagesHandle<Partial<any>>, private webstorageService: WebStorageService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.formGroup = this._formBuilder.group({name: [''], surname: [''],direccion: ['']});
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

    this.route.data.subscribe(
      data => {
        this.webstorageService.getUser().subscribe(
          next => {
            //console.log(next.employee.id);
            //console.log(next.employer.id);
            if (next.employee.id != undefined && next.employer.id == undefined){
              this.nextStep = 4;
            }
            else if (next.employee.id == undefined && next.employer.id != undefined){
              this.nextStep = 8;
            }
            else if (next.employee.id != undefined && next.employer.id != undefined){
              this.nextStep = 3;
            }
            else if (next.employee.id == undefined && next.employer.id == undefined){
              this.nextStep = 4;
            }
          }
        );
      },
      error => {
        console.log(error);
      });
  }

  onSelection($event) {
    this.company = $event.value;
    console.log(this.company);
  }

  ngOnDestroy() {
    if (this._stepperSubscriptionIndex != undefined) this.stepperMessagesHandle.unsubscribe(this._stepperSubscriptionIndex);
  }
}
