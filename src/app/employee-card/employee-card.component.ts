import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})

export class EmployeeCardComponent {
  @Input() employee: any = [];                
  @Input() updatedEmployee: any;
  @Input() isSelected = false;
  editMode: boolean = false;
  isFormVisible: boolean = false;
  isConfirmationVisible: boolean = false;
  confirmationEmployee: any;
  selectedEmployee: any;
  @Output() updateEmp: EventEmitter<any> = new EventEmitter<any>();   //sending to form comp.
  @Output() employeeDeleted: EventEmitter<void> = new EventEmitter<void>();   

  constructor(private employeeService: EmployeeService) {}

  showEditForm(){
    this.editMode = false;
    this.selectedEmployee = false
  }

  showEmployeeForm(editedEmployee: any): void {                 //show edit form
    this.selectedEmployee = { ...this.employee };
    this.isFormVisible = true;
    this.editMode = true;
  }

  hideForm(): void {                                           //hide edit form
    this.isFormVisible = false;
  }

  deleteEmployee(employee: any): void {
    console.log('Deleting employee:', employee);
    this.isConfirmationVisible = true;
    this.confirmationEmployee = employee;
  }

  confirmDelete(): void {
    this.employeeService.deleteEmployee(this.confirmationEmployee.id);
    this.isConfirmationVisible = false;
    this.employeeDeleted.emit(this.confirmationEmployee.id);
  }

  cancelDelete(): void {
    this.isConfirmationVisible = false;
  }

  updateEmployee(updatedEmployee: any): void {    
    console.log('Updated Employee:', updatedEmployee);
    this.employeeService.updateEmployee(updatedEmployee);
    this.updateEmp.emit(updatedEmployee);
    this.hideForm();
  }
}
