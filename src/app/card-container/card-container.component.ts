import { Component, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})

export class CardContainerComponent {
@Input() employees: any[] = [];                  //sending to emp-card comp.             
@Input() noEmployeesMessage: string = '';        //displaying msg  
isFormVisible: boolean = false;
selectedEmployee: any;                           //selected emp in emp-card comp.
formGroup!: FormGroup;
@Input() filteredEmployees: any[] = [];
private employeesSubscription: Subscription;
private allEmployees: any[] = [];

constructor(private router: Router,private employeeService: EmployeeService) { 
  this.employeesSubscription = this.employeeService.employees$.subscribe(employees => {
    this.allEmployees = employees;
  });
}

ngOnDestroy() {
  this.employeesSubscription.unsubscribe();
}

openForm(employee: any): void {
  this.selectedEmployee = employee;
}

ngOnInit() {
  this.loadEmployees();               //load emp from localStorage
}

loadEmployees() {
  this.employees = this.employeeService.getEmployeesFromLocalStorage();
}

deleteEmployee(employeeId: number) {
  this.employees = this.employees.filter((employee: any) => employee.id !== employeeId);
}

}