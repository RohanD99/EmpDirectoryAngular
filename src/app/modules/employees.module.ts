// employees.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDirectoryContainerComponent } from '../employee-directory-container/employee-directory-container.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CardContainerComponent } from '../card-assets/card-container/card-container.component';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeeCardComponent } from '../card-assets/employee-card/employee-card.component'; 
import { EmployeeService } from '../employee-services/employee.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderModule } from './header.module';

@NgModule({
  declarations: [
    EmployeeDirectoryContainerComponent,
    SidebarComponent,
    NavbarComponent,
    CardContainerComponent,
    EmployeeFormComponent,
    EmployeeCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HeaderModule
  ],
  exports: [EmployeeDirectoryContainerComponent], // Shared module
  providers: [EmployeeService]
})
export class EmployeesModule { }
