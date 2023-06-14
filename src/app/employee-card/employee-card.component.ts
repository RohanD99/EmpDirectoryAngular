import { Component,Input } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})

export class EmployeeCardComponent {
  @Input() employee: any = {};
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
    this.isFormVisible
    const index = this.employee.findIndex((emp: { preferredName: any; }) => emp.preferredName === employee.preferredName);
  
    if (index !== -1) {
      this.employee[index].firstname = employee.firstname;
      this.employee[index].lastname = employee.lastname;
      this.employee[index].designation = employee.designation;
      this.employee[index].department = employee.department;
      this.employee[index].mobile = employee.mobile;
      this.employee[index].mailId = employee.mailId;
      this.employee[index].location = employee.location;
      this.employee[index].skypeId = employee.skypeId;
    }
  }
  
  deleteEmployee(employee: any): void {
    this.isConfirmationVisible = true;
    this.confirmationEmployee = employee;
  }

  confirmDelete(): void {
    const index = this.employee.findIndex((emp: { preferredName: any;}) => emp.preferredName === this.confirmationEmployee.preferredName);
    if (index !== -1) {
      this.employee.splice(index, 1);
    }
    this.isConfirmationVisible = false;
  }

  cancelDelete(): void {
    this.isConfirmationVisible = false;
  }
}
  

  

