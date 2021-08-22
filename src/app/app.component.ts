import {ChangeDetectorRef, Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatDialog} from '@angular/material/dialog';
import {MatSidenav} from '@angular/material/sidenav';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Router,ActivatedRoute } from '@angular/router';

import {WebStorageService} from './services/webstorage.service';

import {LoginDialogComponent} from './components/login-dialog/login-dialog.component';

import { User } from './infrastructure/model/user.model';
import { constants } from './app-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(MatSidenav,{static: true}) sideNav: MatSidenav;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  opened: boolean;

  webStorageService: WebStorageService;

  title: string;
  user: User | undefined;
  loginDialog: MatDialog;


  fillerNav = Array.from({length: 10}, (_, i) => `Nav Item ${i + 1}`);

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, webStorageService: WebStorageService,loginDialog: MatDialog
              ,private matIconRegistry: MatIconRegistry,private domSanitizer: DomSanitizer,private router: Router) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.webStorageService = webStorageService;
    this.loginDialog = loginDialog;

    this.matIconRegistry.addSvgIcon('facebook',this.domSanitizer.bypassSecurityTrustResourceUrl(constants.assetsUrl + 'facebook.svg'));
    this.matIconRegistry.addSvgIcon('google-plus',this.domSanitizer.bypassSecurityTrustResourceUrl(constants.assetsUrl + 'google-plus.svg'));
    this.matIconRegistry.addSvgIcon('air_conditioner',this.domSanitizer.bypassSecurityTrustResourceUrl(constants.assetsUrl + 'air-conditioner.svg'));
    this.matIconRegistry.addSvgIcon('exit_to_app',this.domSanitizer.bypassSecurityTrustResourceUrl(constants.assetsUrl + 'exit_to_app-24px.svg'));
    this.matIconRegistry.addSvgIcon('keyboard_arrow_left',this.domSanitizer.bypassSecurityTrustResourceUrl(constants.assetsUrl + 'keyboard_arrow_left-24px.svg'));
    this.matIconRegistry.addSvgIcon('keyboard_arrow_right',this.domSanitizer.bypassSecurityTrustResourceUrl(constants.assetsUrl + 'keyboard_arrow_right-24px.svg'));
    this.matIconRegistry.addSvgIcon('keyboard_arrow_up',this.domSanitizer.bypassSecurityTrustResourceUrl(constants.assetsUrl + 'keyboard_arrow_up-24px.svg'));
    this.matIconRegistry.addSvgIcon('keyboard_arrow_down',this.domSanitizer.bypassSecurityTrustResourceUrl(constants.assetsUrl + 'keyboard_arrow_down-24px.svg'));
    this.matIconRegistry.addSvgIcon('refresh',this.domSanitizer.bypassSecurityTrustResourceUrl(constants.assetsUrl + 'refresh-24px.svg'));
  }

  ngOnInit() {

    this.user = new User();
    this.webStorageService.getUser().subscribe(
      next => {
        if ( next.password != null && next.password != undefined && next.password != '') {

          this.webStorageService.login(next.username, next.password).subscribe(
            user => {
              this.user = user;
              this.router.navigateByUrl('/configure-user',{skipLocationChange:true});
            },
            error => { this.user = new User() });
        }
        else {
          this.user = next;
          console.log(this.user);
        }
      },
      error => {
        console.log(error.message);
        this.user = new User();
      });
  }

  onToggleNav(){
    this.opened = !this.opened;
  }

  onToggleLoginLogoutButton($event): void {

    // Esta condición de abajo implica que hay un usuario logeado, por lo tanto lo que se hace es logout
    if (this.user.roles.length > 0) {
      this.webStorageService.logout().subscribe(
        next => {
          this.user = next;
          this.router.navigateByUrl('/',{skipLocationChange:false});
        },
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

        this.webStorageService.saveRememberMe(result.rememberme);

        switch (result.loginMethod) {
          case 'facebook':
            this.webStorageService.loginFacebook();
            break;
          case 'normal':
            this.webStorageService.login(result.email, result.password).subscribe(
              user => { this.user = user;console.log(user) },
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
  /*test() {
    this.httpService.getLanguages().subscribe(languages => console.log(languages));
  }*/

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
