import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  email: string;
  password: string;
  loginMethod: string;
  rememberme: boolean;
}

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.less']
})
export class LoginDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  facebookClick() {
    this.data.loginMethod = 'facebook';
    this.dialogRef.close(this.data);
  }

  onCancel(): void {
    this.data.loginMethod = '';
    this.dialogRef.close(this.data);
  }

}
