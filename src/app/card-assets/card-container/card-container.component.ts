import { Component, EventEmitter, Output, Input  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee-services/employee.service';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})

export class CardContainerComponent {
@Input() employees: any[] = [];                  //sending to emp-card comp.                     //displaying msg  
isFormVisible: boolean = false;
selectedEmployee: any;                           //selected emp in emp-card comp.
formGroup!: FormGroup;
@Input() filteredEmployees: any[] = [];
@Input() noEmployeesMessage: string = '';
private employeesSubscription: Subscription;
private allEmployees: any[] = [];
department!: string;
office!: string;
jobTitle!: string;

constructor(private router: Router,private employeeService: EmployeeService,private route: ActivatedRoute) { 
  this.employeesSubscription = this.employeeService.employees$.subscribe(employees => {
    this.allEmployees = employees;
  });
}

ngOnDestroy(){
  this.employeesSubscription.unsubscribe();
}

openForm(employee: any): void {
  this.selectedEmployee = employee;
}

ngOnInit() {
  this.loadEmployees();               //load emp from localStorage
  this.filteredEmployees = this.allEmployees;
}

loadEmployees() {
  this.employees = this.employeeService.getEmployeesFromLocalStorage();
}


}