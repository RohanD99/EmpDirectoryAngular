import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-directory-container',
  templateUrl: './employee-directory-container.component.html',
  styleUrls: ['./employee-directory-container.component.css']
})

export class EmployeeDirectoryContainerComponent implements OnInit {
  // employees: any[] = [];
  isFormVisible: boolean = false;
  selectedEmployee: any = {};
  editMode: boolean = false;
  employees: any[] = [];                         //sending to emp-card cont.             
  @Input() noEmployeesMessage: string = '';        //displaying msg  
  filteredEmployees: any[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  filterEmployees(criteria: string): void {
    this.filteredEmployees = this.employees.filter(employee => employee.name.includes(criteria));
  }

  getEmployees() {
    this.employees = this.employeeService.getEmployeesFromLocalStorage();
  }

  updateFilteredEmployees(filteredEmployees: any[]): void {
    this.filteredEmployees = filteredEmployees;
  }
  

  showEmployeeForm() {
    this.isFormVisible = true;
    this.editMode = false;
    this.selectedEmployee = null;
  }

  hideEmployeeForm() {
    this.isFormVisible = false;
    this.editMode = false;
    this.selectedEmployee = null;
  }

  addEmployee(employee: any) {
    debugger
    this.employeeService.addEmployee(employee);
    this.getEmployees();
    this.hideEmployeeForm();
  
  }

  updateEmployee(employee: any) {
    this.employeeService.updateEmployee(employee);
    this.getEmployees();
    this.hideEmployeeForm();
  }
  
  handleFilteredEmployees(filteredEmployees: any[]): void {
    this.filteredEmployees = filteredEmployees;
    console.log(filteredEmployees);
  }

  handleNavbarFilteredEmployees(filteredEmployees: any[]): void {
    this.filteredEmployees = filteredEmployees;
  }
  
}
