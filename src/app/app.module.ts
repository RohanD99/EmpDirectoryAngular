import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EmployeesModule } from './modules/employees.module';
import { RouterModule } from '@angular/router';
import { HeaderModule } from './modules/header.module';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    EmployeesModule,
    RouterModule,
    HeaderModule,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
