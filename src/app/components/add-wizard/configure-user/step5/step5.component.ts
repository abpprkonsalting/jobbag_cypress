import { Component, OnInit, OnDestroy,ViewChildren} from '@angular/core';
import { DragStepperMessagesHandle } from '../../../drag-stepper/drag-stepper.component';
import {WebStorageService} from '../../../../services/webstorage.service';
import { User } from '../../../../infrastructure/model/user.model';
import { Location } from '../../../../infrastructure/model/location.model';
import { ActivatedRoute } from '@angular/router';
import { MatExpansionPanel } from '@angular/material'

@Component({
  selector: 'step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.less']
})
export class Step5Component implements OnInit, OnDestroy {
  @ViewChildren(MatExpansionPanel,{}) allCountries: MatExpansionPanel[];
  user: User;
  allLocations: Location[];
  countries: Location[];
  clickPosition: {
    x: number;
    y: number;
  } = {x:0,y:0};
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
    this.route.data.subscribe( data => {
      this.allLocations = data.locations;
      this.countries = this.allLocations.filter(location => location.parentId == undefined);
      this.countries.forEach(country =>{
        country.children = this.allLocations.filter(location => location.parentId != undefined && location.parentId == country.id);
      });
    });
    this.stepperMessagesHandle.next({value:"INVALID"});

    this._stepperSubscriptionIndex = this.stepperMessagesHandle.subscribe(message =>
      {
        console.log(message);
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

  onmousedown($event){
    this.clickPosition.x = $event.x;
    this.clickPosition.y = $event.y;
    //$event.stopPropagation();
  }
  onMouseUp(object) {
    if ((object.$event.x <= this.clickPosition.x + 10) && (object.$event.x >= this.clickPosition.x - 10) &&
      (object.$event.y <= this.clickPosition.y + 10) && (object.$event.y >= this.clickPosition.y - 10)) {

      let selected = this.allLocations.filter(location => location.id == object.location.id)[0];

      if (selected.parentId == undefined) {
        if (selected.selected == 0) {
          selected.selected = 2;
          selected.children.forEach(child => child.selected = 2);
        }
        else {
          selected.selected = 0;
          selected.children.forEach(child => child.selected = 0);
        }
      }
      else {
        selected.selected = selected.selected == 0 ? 2 : 0;
        let parent = this.allLocations.filter(location => location.id == selected.parentId)[0];
        let siblings = this.allLocations.filter(location => location.parentId != undefined && location.parentId == selected.parentId);
        if (siblings.every(location => location.selected == 2)) {
          parent.selected = 2;
        }
        else if (siblings.some(location => location.selected == 2)) {
          parent.selected = 1;
        }
        else {
          parent.selected = 0;
        }
      }
      //object.$event.stopPropagation();
    }
  }

  closeAll(){
    //this.allCountries.forEach(country => country.close());
  }

  ngOnDestroy() {
    if (this._stepperSubscriptionIndex != undefined) this.stepperMessagesHandle.unsubscribe(this._stepperSubscriptionIndex);
  }
}
