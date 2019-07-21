import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  email: string;
  password: string;
  facebook: boolean;
}

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.less']
})
export class LoginDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  location: string = 'https://jobbag.com/connect/facebook';

  ngOnInit() {
  }

  facebookClick() {
    this.data.facebook = true;
    this.dialogRef.close(this.data);
    //window.location.href="https://jobbag.com/connect/facebook";
  }

  onCancel(): void {
  }

}
