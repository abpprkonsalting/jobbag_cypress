import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked, Input } from '@angular/core';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-project-add-wizard',
  templateUrl: './project-add-wizard.component.html',
  styleUrls: ['./project-add-wizard.component.less']
})
export class ProjectAddWizardComponent implements OnInit, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked {
  isLinear = false;
  @ViewChild('stepperV',{read:false,static:false}) stepperV: MatStepper;
  @ViewChild('stepperH',{read:false,static:false}) stepperH: MatStepper;

  private _dragging: boolean = false;
  _step: number = 0;
  _lastStep: number | undefined = undefined;

  constructor() { }

  ngOnInit() {

  }

  ngAfterContentInit() {

  }
  ngAfterContentChecked() {

  }

  ngAfterViewInit() {
    if (this._lastStep == undefined) this._lastStep = this.stepperH.steps.length - 1;
  }
  ngAfterViewChecked() {

  }

  dragMoved($event: CdkDragMove) {
    let selectorStepper : MatStepper;
    let distance : number = 0;
    if ($event.source.boundaryElementSelector == 'stepperV') {
      selectorStepper =  this.stepperV;
      distance = $event.distance.y;
    }
    else {
      selectorStepper =  this.stepperH;
      distance = $event.distance.x;
    }

    if (this._dragging) {
      if (distance < -20) {
        if (selectorStepper.selectedIndex < (selectorStepper.steps.length - 1)) {
          selectorStepper.selectedIndex++;
          this._step = selectorStepper.selectedIndex;
          console.log(selectorStepper.selectedIndex);
          this._dragging = false;
          console.log('drag stopped');
        }
      }
      else if (distance > 20){
        if (selectorStepper.selectedIndex > 0) {
          selectorStepper.selectedIndex--;
          this._step = selectorStepper.selectedIndex;
          console.log(selectorStepper.selectedIndex);
          this._dragging = false;
          console.log('drag stopped');
        }
      }
    }
  }

  previousStep(){
    this._step--;
  }

  nextStep(){
    this._step++;

  }

  reset() {
    this.stepperH.reset();
    this.stepperV.reset();
    this._step = 0;
  }

  dragStarted($event) {
    console.log('drag started');
    this._dragging = true;
  }
  dragEnded($event) {
    $event.source.reset();
    this._dragging = false;
  }
}
