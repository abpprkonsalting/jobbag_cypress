import { Directionality } from '@angular/cdk/bidi';
import { ChangeDetectorRef, Component, OnInit, Injectable } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
//import { MatStepper } from '@angular/material';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import {Subject} from 'rxjs';


@Component({
  selector: 'custom-stepper-component',
  templateUrl: './custom-stepper.component.html',
  styleUrls: ['./custom-stepper.component.less'],
  providers: [{ provide: CdkStepper , useExisting: CustomStepperComponent }],
})
export class CustomStepperComponent  extends CdkStepper implements OnInit {

  private _dragging: boolean = false;
  v_layout: boolean = false;
  private _tmpIndex: number = 0;

  constructor(dir: Directionality, changeDetectorRef: ChangeDetectorRef,public breakpointObserver: BreakpointObserver,protected messageSubscriber: Subscriber<Partial<any>>)
  {
    super(dir, changeDetectorRef);
  }

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.v_layout = true;
        }
        else {
          this.v_layout = false;
        }
      });
      this.messageSubscriber.subscribe(message => message.value =="next" ? this.next() : this.prev());
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
    this.selectedIndex = this._tmpIndex;
    console.log('drag stopped');
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
        if (this._tmpIndex < (this.steps.length - 1)) {
          this._tmpIndex++;
          console.log(this._tmpIndex);
          this._dragging = false;
        }
      }
      else if (distance > 10){
        if (this._tmpIndex > 0) {
          this._tmpIndex--;
          console.log(this._tmpIndex);
          this._dragging = false;

        }
      }
    }
  }

  prev(){
    this.selectedIndex--;
    this._tmpIndex--;
  }

  next(){
    this.selectedIndex++;
    this._tmpIndex++;
  }

}

@Injectable({
  providedIn: 'root'
})
export class Subscriber<T>
{
  protected observable = new Subject<T>();

  public next(item: T)
  {
    this.observable.next(item);
  }

  public subscribe(callback: (item:T)=>void) {
    this.observable.subscribe(callback);
  }
}
