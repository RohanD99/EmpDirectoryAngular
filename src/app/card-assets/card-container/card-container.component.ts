import { Component, EventEmitter, Output, Input  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee-services/employee.service';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { emptyEmpMessage } from 'src/app/constants/constants';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})

export class CardContainerComponent {
@Input() employees: any[] = [];  
@Output() noEmployeesMessageEvent = new EventEmitter<string>();                //sending to emp-card comp.                     
isFormVisible: boolean = false;
selectedEmployee: any;                                                           //selected emp in emp-card comp.
formGroup!: FormGroup;
@Input() filteredEmployees: any[] = [];                                          //disp filtered emp in card-cont
@Input() noEmployeesMessage: string = '';
private employeesSubscription: Subscription;
private allEmployees: any[] = [];                                                //selecting from all emp
department!: string;
office!: string;
jobTitle!: string;  
emptyMsg?:string;                                                                 //taking str from constants
  
constructor(private router: Router,private employeeService: EmployeeService,private route: ActivatedRoute) { 
  this.employeesSubscription = this.employeeService.employees$.subscribe(employees => {                 //checking when user performs CRUD Ops
    this.allEmployees = employees;
    this.emptyMsg = emptyEmpMessage
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