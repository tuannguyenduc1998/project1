import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ModalPlotsComponent } from './modal-plots/modal-plots.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';


@NgModule({
  declarations: [MenuComponent, HeaderComponent, ModalPlotsComponent],
  imports: [
    CommonModule,
    NzIconModule,
    NzMenuModule,
    NzDropDownModule,
    NzTableModule,
    NzCheckboxModule,
    FormsModule,
    NzModalModule,
    NzPaginationModule
  ],
  exports: [
    MenuComponent,
    HeaderComponent,
    ModalPlotsComponent
  ],
  entryComponents: [ModalPlotsComponent]
})
export class ComponentModule { }
