import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [MenuComponent, HeaderComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MenuComponent,
    HeaderComponent
  ]
})
export class ComponentModule { }
