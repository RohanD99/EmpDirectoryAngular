import { Component, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

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
employees$: Observable<any[]>;

constructor(private router: Router,private employeeService: EmployeeService) { 
  this.employees$ = this.employeeService.employees$;
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

// addEmployee(employee: any): void {
//   this.employees.push(employee);                   //push data to emp-card comp
//   this.employeeService.addEmployee(employee);
// }

deleteEmployee(employeeId: number) {
  this.employees = this.employees.filter((employee: any) => employee.id !== employeeId);
}

}