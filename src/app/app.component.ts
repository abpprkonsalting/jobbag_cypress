import {ChangeDetectorRef, Component, Input, OnInit, OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {HttpService} from './services/http.service';
import {WebStorageService} from './services/webstorage.service';
import { User } from './infrastructure/model/user.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {LoginDialogComponent} from './components/login-dialog/login-dialog.component';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  opened: boolean;
  httpService: HttpService;
  webstorageService: WebStorageService;

  title: string;
  user: User | undefined;
  loginDialog: MatDialog;


  fillerNav = Array.from({length: 10}, (_, i) => `Nav Item ${i + 1}`);

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, httpService: HttpService, webstorageService: WebStorageService,loginDialog: MatDialog
              ,private matIconRegistry: MatIconRegistry,private domSanitizer: DomSanitizer) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.httpService = httpService;
    this.webstorageService = webstorageService;
    this.loginDialog = loginDialog;

    this.matIconRegistry.addSvgIcon('facebook',this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/facebook.svg'));
    this.matIconRegistry.addSvgIcon('google-plus',this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/google-plus.svg'));
  }

  ngOnInit() {

    this.webstorageService.getUser().subscribe(
      next => {
        console.log(next);
        this.user = next;
      },
      error => {
        console.log(error.message);
        this.user = new User();
      });
  }

  onToggleNav($event){
    this.opened = !this.opened;
  }

  onToggleLogin($event): void {
    const dialogRef = this.loginDialog.open(LoginDialogComponent, {
      width: '350px',
      data: {email: "", password: "", facebook: false}
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.facebook) {
        this.httpService.loginFacebook();
      }
      else {
        this.httpService.login(result.email, result.password).subscribe(
          token => {this.user = this.webstorageService.setUserFromToken(token);},
          error => {this.user = new User()});
      }

    });
  }

  test() {
    this.httpService.getLanguages().subscribe(languages => console.log(languages));
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
