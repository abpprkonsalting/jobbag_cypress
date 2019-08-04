import { Component, OnInit, Inject } from '@angular/core';
import { MatInput, MatButton, MatDivider } from '@angular/material';
import {WebStorageService} from '../../../../services/webstorage.service';
import { DragStepperMessagesHandle } from '../../../drag-stepper/drag-stepper.component';
import { User } from 'src/app/infrastructure/model/user.model';

@Component({
  selector: 'step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.less']
})
export class Step2Component implements OnInit {
  user: User;
  constructor( private webstorageService: WebStorageService, protected stepperMessagesHandle: DragStepperMessagesHandle<Partial<any>>) { }

  ngOnInit() {
    this.stepperMessagesHandle.next({value:"INVALID"});
    this.webstorageService.getUser().subscribe(next => {
      this.user = next;
      window.setInterval(function(that){
        that.user = that.webstorageService.checkOtherWindowLogin();
        if (that.user.roles.length > 0) {
          window.location.assign("https://jobbag.ca/web");
        }
      },500,this);
    });
  }
}
