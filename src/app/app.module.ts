import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { EmployeesModule } from './employees/employees.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    EmployeesModule,
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
