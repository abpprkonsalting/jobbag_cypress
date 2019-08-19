import { Component, OnInit, OnDestroy} from '@angular/core';
import { DragStepperMessagesHandle } from '../../../drag-stepper/drag-stepper.component';
import {WebStorageService} from '../../../../services/webstorage.service';
import { User } from '../../../../infrastructure/model/user.model';
import { Experience } from '../../../../infrastructure/model/experience.model';
import {Location } from '../../../../infrastructure/model/location.model';
import {Project } from '../../../../infrastructure/model/project.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.less']
})
export class Step2Component implements OnInit, OnDestroy {
  user: User;
  experiences: Experience[];
  locations: Location[] = [];
  projects: Project[] = [];
  private _stepperSubscriptionIndex;

  constructor(protected stepperMessagesHandle: DragStepperMessagesHandle<Partial<any>>, private webstorageService: WebStorageService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.webstorageService.getUser().subscribe(
      next => {
        this.user = next;
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
            this.locations = data.employeeData.locations;
          }
          if (data.employerData != undefined){
            this.projects = data.employerData.projects;
          }
        },
        error => {
          console.log(error);
        });

    this.stepperMessagesHandle.next({value:"INVALID"});

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

  removeExperience(id) {

    this.user.employee.experience.splice(
      this.user.employee.experience.indexOf(
        this.user.employee.experience.find(exp => exp.profession.id == id)
      ),1);
  }

  removeLocation(id) {

    let toRemove = this.locations.find(location => location.id == id);
    if (toRemove.parentId != undefined) {
      let parent = this.user.employee.workingLocations.find(parent => parent.id == toRemove.parentId);
      parent.children = parent.children.filter(child => child.id != id);
    }
    else {
      this.user.employee.workingLocations = this.user.employee.workingLocations.filter(parent => parent.id != id);
      this.locations = this.locations.filter(location => location.parentId != id);
    }
    this.locations = this.locations.filter(location => location.id != id);
    console.log(this.locations);
    console.log(this.user);
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
