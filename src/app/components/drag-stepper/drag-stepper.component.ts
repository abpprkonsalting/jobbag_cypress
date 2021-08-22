import { Directionality } from '@angular/cdk/bidi';
import { ChangeDetectorRef, Component, OnInit, Injectable, Input, Directive,TemplateRef, Output, EventEmitter, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CdkStepper, CdkStep,StepperOptions } from '@angular/cdk/stepper';
import { MatStepper,MatStep } from '@angular/material'
import { ErrorStateMatcher } from '@angular/material/core';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import {Subject,Subscription} from 'rxjs';

/*@Directive({
  selector: 'drag-step',
  providers: [{ provide: MatStep , useExisting: DragStepComponent }],
})
export class DragStepComponent  extends MatStep {
  data: any;
  constructor(stepper: DragStepperComponent, _errorStateMatcher: ErrorStateMatcher)
  {
    super(stepper, _errorStateMatcher);
  }
}*/

@Component({
  selector: 'drag-stepper',
  templateUrl: './drag-stepper.component.html',
  styleUrls: ['./drag-stepper.component.less'],
  providers: [{ provide: MatStepper , useExisting: DragStepperComponent }],
})
export class DragStepperComponent  extends MatStepper implements OnInit, OnDestroy, AfterViewChecked {
  @Input() stepperShowNav: boolean;
  @Input() linear_u: boolean;
  @Output() dataChange = new EventEmitter<any>();
  @ViewChild('stepContentInner',{static: true}) contentInner : ElementRef;
  _data: any = {};
  _allowed: boolean = false;
  private _dragging: boolean = false;
  private _draggingDir: number;
  v_layout: boolean = false;
  dragDisabled: boolean = true;

  private _stepperSubscriptionIndex;
  private _history: number;
  private _next: number = undefined;
  private _returnDecision: boolean = false;
  cdr: ChangeDetectorRef;


  constructor(dir: Directionality, changeDetectorRef: ChangeDetectorRef,public breakpointObserver: BreakpointObserver,protected messageSubscriber: DragStepperMessagesHandle<Partial<any>>)
  {
    super(dir, changeDetectorRef);
    this.cdr = changeDetectorRef;
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
      this.initExternalMessagesInput();
  }

  reset() {
    this.selectedIndex = 0;
    this._history = undefined;
  }

  ngAfterViewChecked() {
    this.checkDraggable();
  }

  checkDraggable() {
    if (this.contentInner.nativeElement.scrollHeight == this.contentInner.nativeElement.clientHeight) this.dragDisabled = false;
    else this.dragDisabled = true;
    this.cdr.detectChanges()
  }

  dragStarted($event) {
    console.log('drag started');
    this._dragging = true;
  }

  dragEnded($event) {
    $event.source.reset();
    if (!this._dragging) {
      if (this._draggingDir == 0) {
        this.next();
      }
      else {
        this.prev();
      }
    }
    else {
      this._dragging = false;
    }

    //this.selectedIndex = this._tmpIndex;
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
    console.log(distance);

    if (this._dragging) {
      if (distance < -9) {
        this._draggingDir = 0;
        this._dragging = false;
      }
      else if (distance > 9){
        this._draggingDir = 1;
        this._dragging = false;
      }
    }
  }

  prev(){
    if (this.selectedIndex > 0) {
      if (this._returnDecision) {
        this._returnDecision = false;
        this.messageSubscriber.next({value:'stepperReceivedOrderPrev'});
      }
      else if (!this.linear_u) {
        if (this._history !=undefined) {
          this.selectedIndex = this._history;
        } else this.selectedIndex--;
        this._history = undefined;
        this._next = undefined;
        this._returnDecision = false;
        this.messageSubscriber.next({value:'stepChanged',data:this._data});
      }
      else {
        this._returnDecision = false;
        this.messageSubscriber.next({value:'stepperReceivedOrderPrev'});
      }
    }
  }

  next(){
    if (this.selectedIndex < this._steps.length - 1) {
      if (this._returnDecision) {
        this._returnDecision = false;
        this.messageSubscriber.next({value:'stepperReceivedOrderNext'});
      }
      else if (this._allowed) {
        if (this._next != undefined) {
          this._history = this.selectedIndex;
          this.selectedIndex = this._next;
          this._next = undefined;
        }
        else {
          this.selectedIndex++;
          this._history = undefined;
        }
        this._returnDecision = false;
        this.messageSubscriber.next({value:'stepChanged',data:this._data});
      }
      else {
        this._returnDecision = false;
        this.messageSubscriber.next({value:'stepperReceivedOrderNext'});
      }
    }
  }

  last(){
    if (this.selectedIndex < this._steps.length - 1) {
      if (this._allowed) {
        this._history = this.selectedIndex;
        this.selectedIndex = this._steps.length - 1;
        this.messageSubscriber.next({value:'stepChanged',data:this._data});
      }
      else {
        this.messageSubscriber.next({value:'stepperReceivedOrderLast'});
      }
    }
  }

  initExternalMessagesInput() {
    this._stepperSubscriptionIndex = this.messageSubscriber.subscribe(message =>
      {
        console.log(message);
        if (message.data != undefined) {
          this._data = message.data;
          this.dataChange.emit(this._data);
        }
        let messageType = typeof (message.value);
        if ( messageType == 'string') {
          switch (message.value) {
            case "next":
              this.next();
              break;
            case "prev":
                this.prev();
              break;
            case "last":
              this.last();
              break;
            case "prepareNext":
              this._next = message.nextValue;
              break;
            case "VALID":
              this._allowed = true;
              this.messageSubscriber.next({value:'stepperEnabled'});
              break;
            case "INVALID":
              this._allowed = false;
              this.messageSubscriber.next({value:'stepperDisabled'});
              break;
            case "RETURNBACK":
              this._allowed = true;
              this._returnDecision = true;
              break;
            case "CANCELHISTORY":
              this._history = undefined;
              break;
            default:
              break;
          }
        }
        else if (messageType == 'number' && message.value > 0 && message.value <= this.steps.length) {
          this._history = this.selectedIndex;
          this._returnDecision = false;
          this.selectedIndex = message.value - 1;
        }
    });
  }

  ngOnDestroy() {
    if (this._stepperSubscriptionIndex != undefined) this.messageSubscriber.unsubscribe(this._stepperSubscriptionIndex);
  }

}

@Injectable({
  providedIn: 'root'
})
export class DragStepperMessagesHandle<T>
{
  protected observable = new Subject<T>();
  protected subcriptions: Subscription[] = [];
  public next(item: T)
  {
    this.observable.next(item);
  }

  public subscribe(callback: (item:T)=>void):number {
    this.subcriptions.push(this.observable.subscribe(callback));
    return this.subcriptions.length - 1;
  }

  public unsubscribe(index: number) {
    this.subcriptions[index].unsubscribe();
  }
}
