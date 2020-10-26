import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyserviceService } from './service/myservice.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthGuardService } from './service/auth-guard.service';
import { DataPipe } from './pipes/data.pipe';
import localeGB from '@angular/common/locales/vi';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeGB);
import {HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedComponent } from './shared/shared.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    DataPipe,
    DashboardComponent,
    SharedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [MyserviceService, AuthGuardService, {provide: LOCALE_ID, useValue: 'vi'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
