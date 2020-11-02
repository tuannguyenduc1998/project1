import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ModalPlotsComponent } from './modal-plots/modal-plots.component';


@NgModule({
  declarations: [MenuComponent, HeaderComponent, ModalPlotsComponent],
  imports: [
    CommonModule,
    NzIconModule,
    NzMenuModule,
    NzDropDownModule

  ],
  exports: [
    MenuComponent,
    HeaderComponent,
    ModalPlotsComponent
  ],
  entryComponents: [ModalPlotsComponent]
})
export class ComponentModule { }
