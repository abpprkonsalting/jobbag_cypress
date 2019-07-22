import {MediaMatcher} from '@angular/cdk/layout';
import {MediaObserver} from '@angular/flex-layout';
import {ChangeDetectorRef, Component, EventEmitter, Input, Output, OnInit, OnDestroy} from '@angular/core';
import { User } from '../../infrastructure/model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() toggleNav = new EventEmitter<boolean>();
  @Output() toggleLoginLogout = new EventEmitter<boolean>();
  @Input() user: User;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, mediaObserver: MediaObserver) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    mediaObserver.asObservable();
  }

  ngOnInit() {
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

}
