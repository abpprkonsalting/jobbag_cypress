import { Component, OnInit, OnDestroy} from '@angular/core';
import { DragStepperMessagesHandle } from '../../../drag-stepper/drag-stepper.component';
import {WebStorageService} from '../../../../services/webstorage.service';
import { User } from '../../../../infrastructure/model/user.model';
import { Profession } from '../../../../infrastructure/model/profession.model';
import { Experience } from '../../../../infrastructure/model/experience.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.less']
})
export class Step4Component implements OnInit, OnDestroy {
  user: User;
  allProfessions: Profession[];
  categoriesSelected: Profession[];
  myprofessions: Profession[];
  alreadyHaveIt: number[];
  availableProfessions: Profession[];
  availableExperiences: Experience[];
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
        console.log(this.user);
      },
      error => {
        console.log(error.message);
        this.user = new User();
      }
    );
    this.route.data.subscribe( data => {
      this.allProfessions = data.professions;
      this.categoriesSelected = this.allProfessions.filter(profession => profession.categories.length == 0 && profession.selected);
      this.alreadyHaveIt =this.user.employee.experiences.map(experience => experience.profession).map(profession => profession.id);
      console.log(this.alreadyHaveIt);
      this.availableProfessions = this.allProfessions.filter(profession => profession.categories.length > 0 &&
                                  profession.categories.some(category =>
                                    this.allProfessions.find(prof => prof.id == category.id).selected == true
                                  ) && !this.alreadyHaveIt.includes(profession.id));
      console.log(this.availableProfessions);

      this.availableExperiences = this.availableProfessions.map(profession => new Experience(profession,0));

      this.selectedCount = this.availableExperiences.filter(experience => experience.profession.selected == true).length;
      console.log(this.selectedCount);
      this.stepperMessagesHandle.next({value:"INVALID"});
      //else this.stepperMessagesHandle.next({value:"VALID"});



    });


    this._stepperSubscriptionIndex = this.stepperMessagesHandle.subscribe(message =>
      {
        console.log(message);
        let messageType = typeof (message.value);
        if ( messageType == 'string') {

          switch (message.value) {
            case "stepperReceivedOrderNext":

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
  onMouseUpAdd(object){
    if ((object.$event.x <= this.clickPosition.x + 10) && (object.$event.x >= this.clickPosition.x - 10) &&
        (object.$event.y <= this.clickPosition.y + 10) && (object.$event.y >= this.clickPosition.y - 10)) {

          object.experience.years++;
          let selected = this.availableExperiences.filter(exp => exp.profession.id == object.experience.profession.id)[0];
          console.log(selected);
          selected.profession.selected = true;
          this.selectedCount++;
          //this.stepperMessagesHandle.next({value:"VALID"});
    }
  }

  onMouseUpRemove(object){
    if ((object.$event.x <= this.clickPosition.x + 10) && (object.$event.x >= this.clickPosition.x - 10) &&
        (object.$event.y <= this.clickPosition.y + 10) && (object.$event.y >= this.clickPosition.y - 10)) {

          if (object.experience.years > 0) object.experience.years--;

          let selected = this.availableExperiences.filter(exp => exp.profession.id == object.experience.profession.id)[0];
          console.log(selected);
          if (object.experience.years == 0) {
            selected.profession.selected = false;
            this.selectedCount--;
            this.stepperMessagesHandle.next({value:"INVALID"});
          }
    }
  }

  addExperiences() {
    let selectedExperiences = this.availableExperiences.filter(experience => experience.profession.selected == true);
    this.user.employee.experiences = this.user.employee.experiences.concat(selectedExperiences);
    console.log(this.user);
    //this.stepperMessagesHandle.next({value:"prev"});
  }

  ngOnDestroy() {
    if (this._stepperSubscriptionIndex != undefined) this.stepperMessagesHandle.unsubscribe(this._stepperSubscriptionIndex);
  }
}
