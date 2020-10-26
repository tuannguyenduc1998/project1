import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule,  BrowserAnimationsModule , NzMenuModule, NzDropDownModule, NzTabsModule],
  exports: [HeaderComponent, BrowserAnimationsModule , NzMenuModule, NzDropDownModule, NzTabsModule],
})
export class SharedModule {}
