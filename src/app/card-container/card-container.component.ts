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
@Input() employees: any[] = [];                  //sending to emp-card cont.             
@Input() noEmployeesMessage: string = '';        //displaying msg  
isFormVisible: boolean = false;
selectedEmployee: any;                           //selected emp in emp-card comp.
formGroup!: FormGroup;
filteredEmployees: any[] = [];

constructor(private router: Router,private employeeService: EmployeeService) { }

openForm(employee: any): void {
  this.selectedEmployee = employee;
}

ngOnInit() {
  this.loadEmployees();                 //load emp from localStorage
}

ngOnChanges(changes: SimpleChanges) {
  if (changes['employees']) {
    this.filteredEmployees = this.employees; // Update filteredEmployees whenever employees change
  }
}

loadEmployees() {
  this.employees = this.employeeService.getEmployeesFromLocalStorage();
}

addEmployee(employee: any): void {
  this.employees.push(employee);                   //push data to emp-card comp
  this.employeeService.addEmployee(employee);
}

deleteEmployee(employeeId: number) {
  this.employees = this.employees.filter((employee: any) => employee.id !== employeeId);
}

}