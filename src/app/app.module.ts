import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeDirectoryContainerComponent } from './employee-directory-container/employee-directory-container.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CardContainerComponent } from './card-container/card-container.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeCardComponent } from './employee-card/employee-card.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDirectoryContainerComponent,
    HeaderComponent,
    SidebarComponent,
    NavbarComponent,
    CardContainerComponent,
    EmployeeFormComponent,
    EmployeeCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
