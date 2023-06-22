import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDirectoryContainerComponent } from '../employee-directory-container/employee-directory-container.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CardContainerComponent } from '../card-container/card-container.component';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeeCardComponent } from '../employee-card/employee-card.component';
import { EmployeeService } from '../employee.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    EmployeeDirectoryContainerComponent,
    HeaderComponent,
    SidebarComponent,
    NavbarComponent,
    CardContainerComponent,
    EmployeeFormComponent,
    EmployeeCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [EmployeeDirectoryContainerComponent],           //shared module
  providers: [EmployeeService]
})
export class EmployeesModule { }
