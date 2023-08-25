import { Component } from '@angular/core';
import { EmployeeService } from './services/employee.service';
import { Employee } from './models/employee.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'EmpDirectoryAngular';
  isFormVisible: boolean = false;
  selectedEmployee: Employee;

  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {
    this.selectedEmployee = new Employee({});
  }

  getEmployees() {
    this.employeeService.initiate();
  }

  addEmployee(employee: Employee) {
    this.employeeService.addEmployee(employee);
  }
  
  updateEmployee(employee: Employee) {
    this.employeeService.updateEmployee(employee);
  }

}
