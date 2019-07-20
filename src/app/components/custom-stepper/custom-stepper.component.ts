import { Directionality } from '@angular/cdk/bidi';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'custom-stepper-component',
  templateUrl: './custom-stepper.component.html',
  styleUrls: ['./custom-stepper.component.less'],
  providers: [{ provide: MatStepper , useExisting: CustomStepperComponent }],
})
export class CustomStepperComponent  extends MatStepper implements OnInit {

  private _dragging: boolean = false;
  _lastStepIndex: number | undefined = undefined;
  v_layout: boolean = false;

  constructor(dir: Directionality, changeDetectorRef: ChangeDetectorRef,public breakpointObserver: BreakpointObserver)
  {
    super(dir, changeDetectorRef);
  }

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.v_layout = true;
          console.log('Matches small viewport');
          console.log(this.v_layout);
        }
        else {
          this.v_layout = false;
          console.log('Matches other viewports');
          console.log(this.v_layout);
        }
      });
  }

  reset() {
    this.selectedIndex = 0;
  }

  dragStarted($event) {
    console.log('drag started');
    this._dragging = true;
  }
  dragEnded($event) {
    $event.source.reset();
    this._dragging = false;
  }

  dragMoved($event: CdkDragMove) {

    let distance : number = 0;
    if (this.v_layout == true) {
      distance = $event.distance.y;
    }
    else {
      distance = $event.distance.x;
    }

    if (this._dragging) {
      if (distance < -10) {
        if (this.selectedIndex < (this.steps.length - 1)) {
          this.selectedIndex++;
          console.log(this.selectedIndex);
          this._dragging = false;
          console.log('drag stopped');
        }
      }
      else if (distance > 10){
        if (this.selectedIndex > 0) {
          this.selectedIndex--;
          console.log(this.selectedIndex);
          this._dragging = false;
          console.log('drag stopped');
        }
      }
    }
  }

  prev(){
    this.selectedIndex--;
  }

  next(){
    this.selectedIndex++;
  }

}
