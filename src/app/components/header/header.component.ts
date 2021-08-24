import {MediaMatcher} from '@angular/cdk/layout';
import {MediaObserver} from '@angular/flex-layout';
import {ChangeDetectorRef, Component, EventEmitter, Input, Output,
        OnInit, OnDestroy, ViewChild, AfterViewInit, Renderer2} from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { User } from '../../infrastructure/model/user.model';
import { constants } from '../../app-constants';
import {MatToolbar} from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatToolbar, {static: true}) toolbar: MatToolbar;
  @Output() toggleNav = new EventEmitter<boolean>();
  @Output() toggleLoginLogout = new EventEmitter<boolean>();
  @Input() user: User;
  @Input() sideNav: any;
  @Input() isDesktop: boolean;
  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  logoUrl: string;
  inter: number;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, mediaObserver: MediaObserver, private renderer: Renderer2) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    mediaObserver.asObservable();
  }

  ngOnInit() {
    this.logoUrl = constants.assetsUrl + 'logo.png';
  }

  ngAfterViewInit() {
    window.setTimeout(that => {
      that.renderer.addClass(that.toolbar._elementRef.nativeElement, 'is-hidden');
    }, 5000, this);
  }

  buttonPress() {
    this.toggleNav.emit(true);
  }

  loginLogout() {
    this.toggleLoginLogout.emit(true);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  mouseDown($event) {
    if (this.toolbar._elementRef.nativeElement.classList.contains('is-hidden')) {

      this.renderer.removeClass(this.toolbar._elementRef.nativeElement, 'is-hidden');

      this.inter = window.setInterval(that => {
        if (!that.sideNav._opened) {
          that.renderer.addClass(that.toolbar._elementRef.nativeElement, 'is-hidden');
          window.clearInterval(that.inter);
        }
      }, 5000, this);
    }
  }

}
