import { Component, OnInit, OnDestroy} from '@angular/core';
import { DragStepperMessagesHandle } from '../../../drag-stepper/drag-stepper.component';
import {WebStorageService} from '../../../../services/webstorage.service';
import { User } from '../../../../infrastructure/model/user.model';
import {Project } from '../../../../infrastructure/model/project.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'step6',
  templateUrl: './step6.component.html',
  styleUrls: ['./step6.component.less']
})
export class Step6Component implements OnInit, OnDestroy {
  user: User;
  projects: Project[] = [];
  private stepperSubscriptionIndex;
  private prevStep: number;

  constructor(protected stepperMessagesHandle: DragStepperMessagesHandle<Partial<any>>,
              private webstorageService: WebStorageService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.webstorageService.getUser().subscribe(
      next => {
        this.user = next;

        if (this.user.employer.id !== undefined && this.user.employee.id === undefined) {
          this.prevStep = 2;
        } else if (this.user.employer.id !== undefined && this.user.employee.id !== undefined) {
          this.prevStep = 3;
        }
        this.stepperMessagesHandle.next({value: 'RETURNBACK'});
        this.stepperMessagesHandle.next({value: 'INVALID'});
      },
      error => {
        console.log(error.message);
        this.user = new User();
      }
    );
    this.route.data.subscribe(
        data => {
          if (data.employerData !== undefined) {
            this.projects = data.employerData.projects;
            console.log(this.projects);
          }
        },
        error => {
          console.log(error);
        });

    // this.stepperMessagesHandle.next({value:"INVALID"});

    this.stepperSubscriptionIndex = this.stepperMessagesHandle.subscribe(message => {
        const messageType = typeof (message.value);
        if ( messageType === 'string') {
          switch (message.value) {
            case 'stepperReceivedOrderPrev':
                this.stepperMessagesHandle.next({value: this.prevStep});
                break;
            case 'stepperReceivedOrderNext':
                // this.stepperMessagesHandle.next({value: "next"});
              break;
            default:
              break;
          }
        }
      }
    );

  }

  openProject(project) {

  }

  ngOnDestroy() {
    if (this.stepperSubscriptionIndex !== undefined) { this.stepperMessagesHandle.unsubscribe(this.stepperSubscriptionIndex); }
  }
}
