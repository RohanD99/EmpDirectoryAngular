import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})

export class EmployeeCardComponent {
  @Input() employee!: Employee ;
  @Input() updatedEmployee!: Employee ;
  isDeleteConfirmation: boolean = false;
  selectedEmployee!: Employee;
  @Output() updateEmp: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Output() employeeDeleted: EventEmitter<void> = new EventEmitter<void>();

  constructor(private employeeService: EmployeeService, private router: Router) { }

  showEmployeeForm(editedEmployee: Employee) {
    this.employeeService.openEmployeeFormModal();
    this.selectedEmployee = { ...this.employee! };
  }

  deleteEmployee(employee: Employee) {
    this.isDeleteConfirmation = true;
    this.selectedEmployee = employee;
  }

  confirmDelete() {
    if (this.selectedEmployee) {
       this.employeeService.deleteEmployee(this.employee);
      this.isDeleteConfirmation = false;
      this.employeeDeleted.emit();
    }
  }

  updateEmployee(updatedEmployee: Employee) {
    this.employeeService.updateEmployee(updatedEmployee);
    this.updateEmp.emit(updatedEmployee);
  }

  cancelDelete() {
    this.isDeleteConfirmation = false;
  }
}
