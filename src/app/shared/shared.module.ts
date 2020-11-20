import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { ComponentModule } from './components/component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExamDirective } from './directices/exam.directive';
import { KzMaskDirective } from './directices/kz-mask.directive';
import { HiddenButtonDirective } from './directices/hidden-button.directive';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTreeModule } from 'ng-zorro-antd/tree';

@NgModule({
  declarations: [ExamDirective, HiddenButtonDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzMenuModule,
    NzDropDownModule,
    NzTabsModule,
    ComponentModule,
    NzInputModule,
    NzCheckboxModule,
    NzSelectModule,
    FormsModule,
    NzTreeModule,
    NzIconModule,
  ],
  exports: [
    HeaderComponent,
    NzMenuModule,
    NzDropDownModule,
    NzTabsModule,
    ComponentModule,
    CommonModule,
    ReactiveFormsModule,
    ExamDirective,
    HiddenButtonDirective,
    NzInputModule,
    NzCheckboxModule,
    NzSelectModule,
    FormsModule,
    NzTreeModule,
    NzIconModule,
  ],
})
export class SharedModule {}
