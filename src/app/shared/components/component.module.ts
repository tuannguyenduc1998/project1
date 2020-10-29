import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';


@NgModule({
  declarations: [MenuComponent, HeaderComponent],
  imports: [
    CommonModule,
    NzIconModule,
    NzMenuModule

  ],
  exports: [
    MenuComponent,
    HeaderComponent
  ]
})
export class ComponentModule { }
