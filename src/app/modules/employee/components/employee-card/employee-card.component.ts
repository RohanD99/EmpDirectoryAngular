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
  @Input() isSelected = false;
  editMode: boolean = false;
  isFormVisible: boolean = false;
  isDeleteConfirmation: boolean = false;
  selectedEmployee!: Employee;
  @Output() updateEmp: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Output() employeeDeleted: EventEmitter<void> = new EventEmitter<void>();

  constructor(private employeeService: EmployeeService, private router: Router) { }

  showEditForm() {
    this.editMode = false;
  }

  showEmployeeForm(editedEmployee: Employee) {
    this.selectedEmployee = { ...this.employee! };
    this.isFormVisible = true;
    this.editMode = true;
  }

  hideForm() {
    this.isFormVisible = false;
  }

  deleteEmployee(employee: Employee) {
    this.isDeleteConfirmation = true;
    this.selectedEmployee = employee;
  }

  confirmDelete() {
    if (this.selectedEmployee) {
      // this.employeeService.deleteEmployee(this.selectedEmployee);
      this.isDeleteConfirmation = false;
      this.employeeDeleted.emit();
      this.hideForm(); 
    }
  }

  updateEmployee(updatedEmployee: Employee) {
    // this.employeeService.updateEmployee(updatedEmployee);
    this.updateEmp.emit(updatedEmployee);
    this.hideForm();
  }

  cancelDelete() {
    this.isDeleteConfirmation = false;
  }
}
