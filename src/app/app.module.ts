import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule,
          MatFormFieldModule, MatInputModule, MatSidenavModule, MatGridListModule,
          MatListModule, MatMenuModule, MatDialogModule, MatStepperModule } from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HttpService } from './services/http.service';
import {WebStorageService} from './services/webstorage.service';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { CookieService } from 'ngx-cookie-service';
import { HttpTokenInterceptor } from './services/http.token.interceptor';
import { ProjectAddWizardComponent } from './components/project-add-wizard/project-add-wizard.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginDialogComponent,
    ProjectAddWizardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatGridListModule,
    MatListModule,
    FormsModule,
    MatMenuModule,
    HttpClientModule,
    StorageServiceModule,
    MatDialogModule,
    MatStepperModule,
    DragDropModule
  ],
  providers: [ HttpClientModule, HttpService, StorageServiceModule, WebStorageService, JwtHelperService, CookieService,{provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [LoginDialogComponent]
})
export class AppModule { }
