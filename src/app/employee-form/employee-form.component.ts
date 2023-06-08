import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  @Output() hideFormEvent = new EventEmitter<void>();
  isFormVisible: boolean = true;
  employees: any[] = [];

  validateAddEmpForm() {

  }

  closeForm() {
    this.hideFormEvent.emit();
  }

  addEmployee(employee: any): void {
    this.employees.push(employee);
    debugger
}

}
  

