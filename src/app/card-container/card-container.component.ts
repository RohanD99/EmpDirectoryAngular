import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})

export class CardContainerComponent {
@Input() employees: any[] = [];
@Input() noEmployeesMessage: string = '';
isFormVisible: boolean = false;

constructor(private router: Router,private employeeService: EmployeeService) { }

selectedEmployee: any;

openForm(employee: any): void {
  this.selectedEmployee = employee;
}
ngOnInit() {
  this.loadEmployees();
}

loadEmployees() {
  this.employees = this.employeeService.getEmployeesFromLocalStorage();
}

showForm(){
  this.isFormVisible=false;
}

addEmployee(employee: any): void {
  this.employees.push(employee);
  this.employeeService.addEmployee(employee);
}

}
