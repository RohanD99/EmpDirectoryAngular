import { Component, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})

export class CardContainerComponent {
@Input() employees: any[] = [];
@Input() noEmployeesMessage: string = '';
isFormVisible: boolean = false;
selectedEmployee: any;
formGroup!: FormGroup;

  showEditForm(employee: any): void {
    this.selectedEmployee = employee;
    this.isFormVisible = true;
  }
constructor(private router: Router,private employeeService: EmployeeService) { }

openForm(employee: any): void {
  this.selectedEmployee = employee;
}

ngOnChanges(changes: SimpleChanges) {
  if (changes['employee']) {
    this.formGroup.reset();
    if (this.employees) {
      this.formGroup.patchValue(this.employees);
    }
  }
}
ngOnInit() {
  this.loadEmployees();
}

loadEmployees() {
  this.employees = this.employeeService.getEmployeesFromLocalStorage();
}



addEmployee(employee: any): void {
  this.employees.push(employee);
  this.employeeService.addEmployee(employee);
}

}
