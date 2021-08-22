import { Component, OnInit, OnDestroy} from '@angular/core';
import { DragStepperMessagesHandle } from '../../../drag-stepper/drag-stepper.component';
import {WebStorageService} from '../../../../services/webstorage.service';
import { User } from '../../../../infrastructure/model/user.model';
import { Experience } from '../../../../infrastructure/model/experience.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'step2a',
  templateUrl: './step2a.component.html',
  styleUrls: ['./step2a.component.less']
})
export class Step2aComponent implements OnInit, OnDestroy {
  user: User;
  experiences: Experience[];
  private _stepperSubscriptionIndex;
  private _prevStep: number;

  constructor(protected stepperMessagesHandle: DragStepperMessagesHandle<Partial<any>>, private webstorageService: WebStorageService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.webstorageService.getUser().subscribe(
      next => {
        this.user = next;

        if (this.user.employee.id != undefined && this.user.employer.id == undefined){
          this._prevStep = 2;
          this.stepperMessagesHandle.next({value:"RETURNBACK"});
        }

      },
      error => {
        console.log(error.message);
        this.user = new User();
      }
    );
    this.route.data.subscribe(
        data => {
          if (data.employeeData != undefined){
            this.experiences = data.employeeData.experiences;
          }
        },
        error => {
          console.log(error);
        });

    //this.stepperMessagesHandle.next({value:"INVALID"});

    this._stepperSubscriptionIndex = this.stepperMessagesHandle.subscribe(message =>
      {
        let messageType = typeof (message.value);
        if ( messageType == 'string') {
          switch (message.value) {
            case "stepperReceivedOrderPrev":
                this.stepperMessagesHandle.next({value:this._prevStep});
              break;
            case "stepperReceivedOrderNext":
                this.stepperMessagesHandle.next({value: "next"});
              break;
            default:
              break;
          }
        }
      }
    );

  }

  removeExperience(id) {

    this.user.employee.experiences.splice(
      this.user.employee.experiences.indexOf(
        this.user.employee.experiences.find(exp => exp.profession.id == id)
      ),1);
  }

  add() {
    //this.stepperMessagesHandle.next({value:"VALID"});
    this.stepperMessagesHandle.next({value: 6});
  }

  onSelection($event) {
    this.stepperMessagesHandle.next({value:"VALID"});
    if ($event.value == 0) this.stepperMessagesHandle.next({value: "next"});
    else this.stepperMessagesHandle.next({value: "last"});
  }

  ngOnDestroy() {
    if (this._stepperSubscriptionIndex != undefined) this.stepperMessagesHandle.unsubscribe(this._stepperSubscriptionIndex);
  }
}
