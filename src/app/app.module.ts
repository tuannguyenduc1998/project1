import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import localeGB from '@angular/common/locales/vi';
import { CommonModule, registerLocaleData } from '@angular/common';
registerLocaleData(localeGB);
import {HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from './shared/shared.module';
import { ComponentModule } from './shared/components/component.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuardService } from './shared/service/auth-guard.service';
import { MyserviceService } from './shared/service/myservice.service';
import { DataPipe } from './shared/pipes/data.pipe';
import { AuthComponent } from './auth/auth.component';
@NgModule({
  declarations: [
    AppComponent,
    DataPipe,
    DashboardComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    SharedModule
  ],
  providers: [MyserviceService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
