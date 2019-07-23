import {ChangeDetectorRef, Component, Input, OnInit, OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {HttpService} from './services/http.service';
import {WebStorageService} from './services/webstorage.service';
import { User } from './infrastructure/model/user.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {LoginDialogComponent} from './components/login-dialog/login-dialog.component';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { constants } from './app-constants';

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

    this.matIconRegistry.addSvgIcon('facebook',this.domSanitizer.bypassSecurityTrustResourceUrl(constants.assetsUrl + 'facebook.svg'));
    this.matIconRegistry.addSvgIcon('google-plus',this.domSanitizer.bypassSecurityTrustResourceUrl(constants.assetsUrl + 'google-plus.svg'));
    this.matIconRegistry.addSvgIcon('air_conditioner',this.domSanitizer.bypassSecurityTrustResourceUrl(constants.assetsUrl + 'air-conditioner.svg'));
  }

  ngOnInit() {

    this.webstorageService.getUser().subscribe( next => this.user = next,
      error => {
        console.log(error.message);
        this.user = new User();
      });
  }

  onToggleNav($event){
    this.opened = !this.opened;
  }

  onToggleLoginLogoutButton($event): void {

    // Esta condición de abajo implica que hay un usuario logeado, por lo tanto lo que se hace es logout
    if (this.user.username !== "") {
      this.webstorageService.logout().subscribe(next => this.user = next,
      error => {
        console.log(error.message);
        this.user = new User();
      });
    }
    else {
      // Esto es el caso contrario, por lo tanto se hace login
      const dialogRef = this.loginDialog.open(LoginDialogComponent, {
        width: '350px',
        data: {email: "", password: "", loginMethod: 'normal', rememberme: true}
      });

      dialogRef.afterClosed().subscribe(result => {

        this.webstorageService.saveRememberMe(result.rememberme);

        switch (result.loginMethod) {
          case 'facebook':
            this.webstorageService.saveFacebookSessionTempKey();
            this.httpService.loginFacebook();
            break;
          case 'normal':
            this.httpService.login(result.email, result.password).subscribe(
              token => { this.user = this.webstorageService.setUserFromJWToken(token); },
              error => { this.user = new User() });
            break;
          default:
            break;
        }
      });
    }

  }

  closeSidenav() {
    this.opened = !this.opened;
  }
  test() {
    this.httpService.getLanguages().subscribe(languages => console.log(languages));
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
