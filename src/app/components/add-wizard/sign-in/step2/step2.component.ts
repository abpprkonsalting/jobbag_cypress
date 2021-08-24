import { Component, OnInit, OnDestroy} from '@angular/core';
import { DragStepperMessagesHandle } from '../../../drag-stepper/drag-stepper.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WebStorageService} from '../../../../services/webstorage.service';
import { User } from '../../../../infrastructure/model/user.model';
import { Router} from '@angular/router';
import { Employee } from 'src/app/infrastructure/model/employee.model';
import { Employer } from 'src/app/infrastructure/model/employer.model';

@Component({
  selector: 'step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.less']
})
export class Step2Component implements OnInit, OnDestroy {
  formGroup: FormGroup;
  user: User;
  private stepperSubscriptionIndex;
  rememberme: boolean = true;

  constructor(private formBuilder: FormBuilder, protected stepperMessagesHandle: DragStepperMessagesHandle<Partial<any>>, private webStorageService: WebStorageService,private router: Router) { }

  ngOnInit() {

    this.webStorageService.getUser().subscribe(
      next => {
        this.user = next;
        console.log(this.user);
        this.formGroup = this.formBuilder.group({
          email: [this.user.email, Validators.required], password: [this.user.email, Validators.required]
        });
      },
      error => {
        console.log(error.message);
        this.user = new User();
      }
    );

    this.stepperMessagesHandle.next({value:"VALID"});

    this.stepperSubscriptionIndex = this.stepperMessagesHandle.subscribe(message =>
      {
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

  login() {
    if (this.formGroup.valid) {
      this.webStorageService.saveRememberMe(this.rememberme);

      this.webStorageService.login(this.formGroup.controls.email.value,this.formGroup.controls.password.value).subscribe(
        user => {
          this.user = user;
          if (this.webStorageService.getWantToWork) {
            if (this.user.employee != undefined && this.user.employee.id != 0) {
              // ir a la lista de trabajos para escoger
            }
            else {
              // ir al wizzard para crear employee;
            }
            this.webStorageService.setWantToWork(false);
          }
          else if (this.webStorageService.getWantToHire) {
            if (this.user.employer != undefined && this.user.employer.id != 0) {
              // ir al wizzard de crear proyecto nuevo
            }
            else {
              // ir al wizzard para crear employer;
            }
            this.webStorageService.setWantToHire(false);
          }
        },
        error => { this.user = new User() });
    }
    else {
      Object.keys(this.formGroup.controls).forEach((key) => {
        if (!this.formGroup.get(key).valid) this.formGroup.get(key).markAsTouched();
      });
    }
  }

  createAccount() {
    if (this.formGroup.valid) {

      if (this.webStorageService.getWantToWork) {
        this.user = new User(0,this.formGroup.controls.email.value,this.formGroup.controls.password.value,null,null,null,[],new Employee(0,""),null,this.formGroup.controls.email.value);
      }
      else if (this.webStorageService.getWantToWork) {
        this.user = new User(0,this.formGroup.controls.email.value,this.formGroup.controls.password.value,null,null,null,[],null,new Employer(0,[]),this.formGroup.controls.email.value);
      }
      this.webStorageService.setUser(this.user).subscribe(
        user => {
          this.user = user;
          console.log(this.user);
          this.stepperMessagesHandle.next({value: "next"});
        });
    }
    else {
      Object.keys(this.formGroup.controls).forEach((key) => {
        if (!this.formGroup.get(key).valid) this.formGroup.get(key).markAsTouched();
      });
    }
  }

  ngOnDestroy() {
    if (this.stepperSubscriptionIndex != undefined) this.stepperMessagesHandle.unsubscribe(this.stepperSubscriptionIndex);
  }
}
