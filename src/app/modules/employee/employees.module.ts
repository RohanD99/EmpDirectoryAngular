// employees.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../header/components/sidebar/sidebar.component';
import { NavbarComponent } from '../header/components/navbar/navbar.component';
import { CardContainerComponent } from './components/card-container/card-container.component';
import { EmployeeService } from '../../services/employee.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';

@NgModule({
  declarations: [
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
  ],
  exports: [ SidebarComponent,
    NavbarComponent,
    CardContainerComponent,
    EmployeeFormComponent,
    EmployeeCardComponent
    ],
  providers: [EmployeeService]
})
export class EmployeesModule { }