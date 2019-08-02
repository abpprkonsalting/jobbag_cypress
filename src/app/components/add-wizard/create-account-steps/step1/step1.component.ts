import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DragStepperMessagesHandle } from '../../../drag-stepper/drag-stepper.component';
import {WebStorageService} from '../../../../services/webstorage.service';
import { User } from 'src/app/infrastructure/model/user.model';

@Component({
  selector: 'step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.less']
})
export class Step1Component implements OnInit {
  formGroup: FormGroup;
  user: User;

  constructor(private _formBuilder: FormBuilder, protected stepperMessagesHandle: DragStepperMessagesHandle<Partial<any>>, private webstorageService: WebStorageService) { }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      email: ['', Validators.required], password: ['', Validators.required]
    });
    this.formGroup.statusChanges.subscribe(status => this.stepperMessagesHandle.next({value:status}));
    this.stepperMessagesHandle.next({value:'INVALID'});

    this.webstorageService.getUser().subscribe(
      next => {
        this.user = next;
        this.formGroup.controls.email.setValue(this.user.username);
        this.formGroup.controls.password.setValue(this.user.password);
        if ( this.user.roles.length > 0 ) { // Esto es que hay un user logged en la aplicación, por lo tanto hay que deslogearlo antes de crear uno nuevo.
          this.webstorageService.logout().subscribe(next => this.user = next);
        }
      },
      error => {
        console.log(error.message);
        this.user = new User();
      });

      this.stepperMessagesHandle.subscribe(message =>
        {
        let messageType = typeof (message.value);
        if ( messageType == 'string') {
          switch (message.value) {
            case "stepperReceivedChangeOrder":
              this.user.username = this.formGroup.controls.email.value;
              this.user.password = this.formGroup.controls.password.value;
              this.webstorageService.setUser(this.user);
              Object.keys(this.formGroup.controls).forEach((key) => {
                if (!this.formGroup.get(key).valid) this.formGroup.get(key).markAsTouched();
              });
              break;
            default:
              break;
          }
        }
      });
  }

  onclick($event){
    this.stepperMessagesHandle.next({value:"next"});
  }

}
