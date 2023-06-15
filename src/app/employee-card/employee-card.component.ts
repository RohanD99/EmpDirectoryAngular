import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent {
  @Input() employee: any = [];
  @Output() editEmpEvent = new EventEmitter<any>();
  editMode: boolean = false;
  isFormVisible: boolean = false;
  isConfirmationVisible: boolean = false;
  confirmationEmployee: any;
 


  constructor(private employeeService: EmployeeService) {}

  showEmployeeForm() {
    this.editMode = !this.editMode;
    this.isFormVisible = true;
  }

  editEmployee(employee: any): void {
    this.editEmpEvent.emit(employee);
  }

  deleteEmployee(employee: any): void {
    console.log('Deleting employee:', employee);
    this.isConfirmationVisible = true;
    this.confirmationEmployee = employee;
  }

  confirmDelete(): void {
    this.employeeService.deleteEmployee(this.confirmationEmployee.id);
    this.isConfirmationVisible = false;
  }

  cancelDelete(): void {
    this.isConfirmationVisible = false;
  }
}
