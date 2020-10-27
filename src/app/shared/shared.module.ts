import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { ComponentModule } from './components/component.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [],
  imports: [CommonModule , ReactiveFormsModule, NzMenuModule, NzDropDownModule, NzTabsModule, ComponentModule],
  exports: [HeaderComponent, NzMenuModule, NzDropDownModule, NzTabsModule, ComponentModule],
})
export class SharedModule {}
