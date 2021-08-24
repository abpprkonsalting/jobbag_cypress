
import { Component, OnInit, OnDestroy, ViewChildren, QueryList, AfterViewInit} from '@angular/core';
import { DragStepperMessagesHandle } from '../../../drag-stepper/drag-stepper.component';
import {WebStorageService} from '../../../../services/webstorage.service';
import { User } from '../../../../infrastructure/model/user.model';
import { Location } from '../../../../infrastructure/model/location.model';
import { ActivatedRoute } from '@angular/router';
import { MatExpansionPanel } from '@angular/material';

@Component({
  selector: 'step2b',
  templateUrl: './step2b.component.html',
  styleUrls: ['./step2b.component.less']
})
export class Step2bComponent implements OnInit, OnDestroy {
  @ViewChildren(MatExpansionPanel, {}) allPanelCountries: QueryList<MatExpansionPanel>;
  user: User;
  allLocations: Location[];
  availableLocations: Location[];
  countries: Location[];
  clickPosition: {
    x: number;
    y: number;
  } = {x: 0, y: 0};
  private stepperSubscriptionIndex;
  private firstPanelIndex: number;

  constructor(protected stepperMessagesHandle: DragStepperMessagesHandle<Partial<any>>,
              private webstorageService: WebStorageService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.webstorageService.getUser().subscribe(
      next => {
        this.user = next;
        console.log(this.user.employee.locations);
      },
      error => {
        console.log(error.message);
        this.user = new User();
      }
    );

    this.route.data.subscribe(
      data => {
        this.allLocations = data.locations;
        console.log(this.allLocations);
        let myLocationsIds = [];
        this.user.employee.locations.forEach(
          country => {
            myLocationsIds.push(country.id);
            if (country.children.length > 0 ) {
              myLocationsIds = myLocationsIds.concat(country.children.map(child => child.id));
            }
        });
        console.log(myLocationsIds);

        this.countries = this.allLocations.filter(location => location.parentId === undefined);
        this.countries.forEach(country => {
          country.children = [];
          country.children.push(country);
          const real = this.allLocations.filter(location => location.parentId !== undefined && location.parentId === country.id);
          real.forEach(child => {
            if (myLocationsIds.includes(child.id)) {
              child.selected = 2;
              country.selected = 1;
            }
          });
          if (real.every(child => child.selected === 2)) { country.selected = 2; }
          country.children = country.children.concat(real);
        });
        console.log(this.countries);
      }
    );
    this.stepperMessagesHandle.next({value: 'VALID'});
    this.stepperMessagesHandle.next({value: 'RETURNBACK'});

    this.stepperSubscriptionIndex = this.stepperMessagesHandle.subscribe(message => {
        const messageType = typeof (message.value);
        if ( messageType === 'string') {

          switch (message.value) {
            case 'stepperReceivedOrderNext':
                this.updateUserLocations();
                this.stepperMessagesHandle.next({value: 9});
                break;
            case 'stepperReceivedOrderPrev':
                this.updateUserLocations();
                this.stepperMessagesHandle.next({value: 'prev'});
                break;
            default:
              break;
          }
        }
      }
    );
  }

  ngAfterViewInit() {
    const idSplitted = this.allPanelCountries.first.id.split('-');
    this.firstPanelIndex = parseInt(idSplitted[idSplitted.length - 1]);
  }

  onmousedown($event) {
    this.clickPosition.x = $event.x;
    this.clickPosition.y = $event.y;
  }
  onMouseUp(object) {

    if ((object.$event.x <= this.clickPosition.x + 10) && (object.$event.x >= this.clickPosition.x - 10) &&
      (object.$event.y <= this.clickPosition.y + 10) && (object.$event.y >= this.clickPosition.y - 10)) {

      const selected = this.allLocations.filter(location => location.id === object.location.id)[0];

      if (selected.parentId === undefined) {

        if (selected.selected === 0) {
          selected.selected = 2;
          selected.children.forEach(child => child.selected = 2);
        } else {
          selected.selected = 0;
          selected.children.forEach(child => child.selected = 0);
        }

      } else {
        selected.selected = selected.selected === 0 ? 2 : 0;
        const parent = this.allLocations.filter(location => location.id === selected.parentId)[0];
        const siblings = this.allLocations.filter(location => location.parentId !== undefined && location.parentId === selected.parentId);
        if (siblings.every(location => location.selected === 2)) {
          parent.selected = 2;
        } else if (siblings.some(location => location.selected === 2)) {
          parent.selected = 1;
        } else {
          parent.selected = 0;
        }
      }
    }
  }

  updateUserLocations() {
    this.countries = this.countries.filter(country => country.selected > 0);
    this.countries.forEach(country => {
      country.children.shift();
      country.children = country.children.filter(child => child.selected > 0);
      country = this.cloneCountry(country);
    });
    console.log(this.countries);
    this.user.employee.locations = this.countries;
  }

  cloneCountry(country: Location) {
    const newCountry = new Location(country.id, country.name, country.isoCode, country.flagUrl, []);
    if (country.children !== undefined && country.children.length > 0) {
      country.children.forEach(child => {
        const newProvince = this.cloneCountry(child);
        newCountry.children.push(newProvince);
      });
    }
    return newCountry;
  }

  afterPanelExpand(id) {
    this.allPanelCountries.filter(panel => {
                                              const idSplitted = panel.id.split('-');
                                              return idSplitted[idSplitted.length - 1] !== (id + this.firstPanelIndex);
                                            }).forEach(b => b.close());
  }

  closeAll() {
  }

  ngOnDestroy() {
    if (this.stepperSubscriptionIndex !== undefined) { this.stepperMessagesHandle.unsubscribe(this.stepperSubscriptionIndex); }
  }
}
