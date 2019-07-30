import {MediaMatcher} from '@angular/cdk/layout';
import {MediaObserver} from '@angular/flex-layout';
import {ChangeDetectorRef, Component, EventEmitter, Input, Output, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { User } from '../../infrastructure/model/user.model';
import { constants } from '../../app-constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild(CdkDrag,{static: false}) headerDrag: CdkDrag;
  @Output() toggleNav = new EventEmitter<boolean>();
  @Output() toggleLoginLogout = new EventEmitter<boolean>();
  @Input() user: User;
  @Input() sideNav: any;
  @Input() isDesktop: boolean;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  logoUrl: string;
  isHidden: boolean = true;
  inter: number;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, mediaObserver: MediaObserver) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    mediaObserver.asObservable();
  }

  ngOnInit() {
    this.logoUrl = constants.assetsUrl + 'logo.png';
    this.isHidden = true;
  }

  buttonPress(){
    console.log('button pressed');
    this.toggleNav.emit(true);
  };

  loginLogout() {
    console.log('login button pressed');
    this.toggleLoginLogout.emit(true);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  dragEnded($event) {
    this.inter = window.setInterval(function(that){
      if (!that.sideNav._opened) {
        that.headerDrag.reset();
        that.isHidden = true;
        window.clearInterval(that.inter);
      }
    },5000,this);
  }

}
