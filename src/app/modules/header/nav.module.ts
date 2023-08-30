import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,   
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    NavbarComponent
  ]
})
export class HeaderModule { }
