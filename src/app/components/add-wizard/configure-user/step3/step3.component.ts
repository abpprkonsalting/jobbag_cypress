import { Component, OnInit, OnDestroy} from '@angular/core';
import { DragStepperMessagesHandle } from '../../../drag-stepper/drag-stepper.component';
import {WebStorageService} from '../../../../services/webstorage.service';
import { User } from '../../../../infrastructure/model/user.model';
import { Profession } from '../../../../infrastructure/model/profession.model';
import { ActivatedRoute } from '@angular/router';

import { professions } from '../../../../app-constants';

@Component({
  selector: 'step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.less']
})
export class Step3Component implements OnInit, OnDestroy{
  user: User;
  professions: Profession[];
  categories: Profession[];
  selectedCount: number;
  clickPosition: {
    x: number;
    y: number;
  } = {x:0,y:0};
  private _stepperSubscriptionIndex: number;

  constructor(protected stepperMessagesHandle: DragStepperMessagesHandle<Partial<any>>, private webstorageService: WebStorageService, private route: ActivatedRoute) { }

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

    this.route.data.subscribe( data => {
      this.professions = data.professions;
      this.categories = this.professions.filter( profession => profession.categories.length == 0 );
      this.selectedCount = this.categories.filter(profession => profession.selected == true).length;
      if (this.selectedCount == 0)  this.stepperMessagesHandle.next({value:"INVALID"});
      else this.stepperMessagesHandle.next({value:"VALID"});
    });

    this.stepperMessagesHandle.next({value:"RETURNBACK"});

    this._stepperSubscriptionIndex = this.stepperMessagesHandle.subscribe(message =>
      {
        let messageType = typeof (message.value);
        if ( messageType == 'string') {
          switch (message.value) {
            case "stepperReceivedOrderNext":
              if (this.selectedCount > 0) {
                this.stepperMessagesHandle.next({value:"VALID"});
                this.stepperMessagesHandle.next({value:"next"});
              }
              break;
              case "stepperReceivedOrderPrev":
                  this.stepperMessagesHandle.next({value:4});
                break;
            default:
              break;
          }
        }
      }
    );
  }

  onmousedown($event){
    this.clickPosition.x = $event.x;
    this.clickPosition.y = $event.y;
    //this.stepperMessagesHandle.next({value:"next"});
  }
  onMouseUp(object){
    if ((object.$event.x <= this.clickPosition.x + 10) && (object.$event.x >= this.clickPosition.x - 10) &&
        (object.$event.y <= this.clickPosition.y + 10) && (object.$event.y >= this.clickPosition.y - 10)) {
          let selected = this.professions.filter(profession => profession.id == object.profession.id)[0];
          selected.selected = !selected.selected;
          if (selected.selected) this.selectedCount++;
          else {
            this.selectedCount--;
            // Des-seleccionar los children
            this.professions.filter(profession => profession.categories.length > 0 && profession.categories.includes(object.profession)).forEach(profession => profession.selected = false);
          }
          if (this.selectedCount > 0 ) this.stepperMessagesHandle.next({value:"VALID"});
          else this.stepperMessagesHandle.next({value:"INVALID"});
    }
  }

  ngOnDestroy() {
    if (this._stepperSubscriptionIndex != undefined) this.stepperMessagesHandle.unsubscribe(this._stepperSubscriptionIndex);
  }
}
