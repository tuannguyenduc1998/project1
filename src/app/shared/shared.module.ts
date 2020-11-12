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
import { ExamDirective } from './directices/exam.directive';
import { KzMaskDirective } from './directices/kz-mask.directive';
import { HiddenButtonDirective } from './directices/hidden-button.directive';

@NgModule({
  declarations: [ExamDirective, HiddenButtonDirective],
  imports: [CommonModule , ReactiveFormsModule, NzMenuModule, NzDropDownModule, NzTabsModule, ComponentModule],
  exports: [HeaderComponent, NzMenuModule, NzDropDownModule,
            NzTabsModule, ComponentModule, CommonModule, ReactiveFormsModule, ExamDirective, HiddenButtonDirective],

})
export class SharedModule {}
