import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeService } from 'src/app/employee-services/employee.service';
import { Router } from '@angular/router';

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
  isDeleteConfirmation: boolean = false;
  selectedEmployee: any;
  @Output() updateEmp: EventEmitter<any> = new EventEmitter<any>();   //sending to form comp.
  @Output() employeeDeleted: EventEmitter<void> = new EventEmitter<void>();   

  constructor(private employeeService: EmployeeService,private router: Router) {}

  showEditForm(){
    this.editMode = false;
    this.selectedEmployee = null
  }

  showEmployeeForm(editedEmployee: any): void {                 //show edit form
    this.selectedEmployee = { ...this.employee };
    this.isFormVisible = true;
    this.editMode = true;
    this.router.navigateByUrl('/edit/:id');
  }

  hideForm(): void {                                           //hide edit form
    this.isFormVisible = false;
  }

  deleteEmployee(employee: any): void {
    this.isDeleteConfirmation = true;
    this.selectedEmployee = employee; 
    this.router.navigateByUrl('/delete/:id');
  }

  confirmDelete(): void {
    this.employeeService.deleteEmployee(this.selectedEmployee.id);
    this.isDeleteConfirmation = false;
    this.employeeDeleted.emit(this.selectedEmployee.id);
  }

  cancelDelete(): void {
    this.isDeleteConfirmation = false;
  }

  updateEmployee(updatedEmployee: any): void {    
    this.employeeService.updateEmployee(updatedEmployee);
    this.updateEmp.emit(updatedEmployee);
    this.hideForm();
  }
}
