import { Component, OnInit, OnDestroy} from '@angular/core';
import { DragStepperMessagesHandle } from '../../../drag-stepper/drag-stepper.component';
import {WebStorageService} from '../../../../services/webstorage.service';
import { User } from '../../../../infrastructure/model/user.model';
import { Profession } from '../../../../infrastructure/model/profession.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.less']
})
export class Step4Component implements OnInit, OnDestroy {
  user: User;
  allProfessions: Profession[];
  firstlevelsSelected: number[];
  availableProfessions: Profession[];
  clickPosition: {
    x: number;
    y: number;
  } = {x:0,y:0};
  private _stepperSubscriptionIndex;
  selectedCount: number;

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
    this.route.data.subscribe( data => {
      this.allProfessions = data.professions;
      this.firstlevelsSelected = this.allProfessions.filter(profession => profession.parentId == undefined && profession.selected).map(profession => profession.id);
      this.availableProfessions = this.allProfessions.filter(profession => profession.parentId != undefined && this.firstlevelsSelected.includes(profession.parentId));
      this.selectedCount = this.availableProfessions.filter(profession => profession.selected == true).length;
      console.log(this.selectedCount);
      if (this.selectedCount == 0) this.stepperMessagesHandle.next({value:"INVALID"});
      else this.stepperMessagesHandle.next({value:"VALID"});
    });


    this._stepperSubscriptionIndex = this.stepperMessagesHandle.subscribe(message =>
      {
        console.log(message);
        let messageType = typeof (message.value);
        if ( messageType == 'string') {

          switch (message.value) {
            case "stepperReceivedOrderNext":
                if (this.selectedCount > 0) {
                  this.stepperMessagesHandle.next({value:"VALID"});
                  this.stepperMessagesHandle.next({value:"next",data:{'professions':this.allProfessions}});
                }
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
  }
  onMouseUp(object){
    if ((object.$event.x <= this.clickPosition.x + 10) && (object.$event.x >= this.clickPosition.x - 10) &&
        (object.$event.y <= this.clickPosition.y + 10) && (object.$event.y >= this.clickPosition.y - 10)) {

          let selected = this.availableProfessions.filter(profession => profession.id == object.profession.id)[0];
          selected.selected = !selected.selected;
          if (selected.selected) this.selectedCount++;
          else this.selectedCount--;

    }
    if (this.selectedCount > 0 ) this.stepperMessagesHandle.next({value:"VALID"});
    else this.stepperMessagesHandle.next({value:"INVALID"});
  }

  ngOnDestroy() {
    if (this._stepperSubscriptionIndex != undefined) this.stepperMessagesHandle.unsubscribe(this._stepperSubscriptionIndex);
  }
}
