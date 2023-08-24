import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EmployeeService } from './employee-services/employee.service';
import { Employee } from './models/employee.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'EmpDirectoryAngular';
  isFormVisible: boolean = false;
  selectedEmployee: Employee | null = null;
  editMode: boolean = false;
  employees: Employee[] = [];
  @Input() noEmployeesMessage: string = '';
  filteredEmployees: Employee[] = [];
  selectedAlphabet: string = '';
  searchTerm: string = '';
  filterredEmployees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {
    const storedAlphabet = localStorage.getItem('selectedAlphabet');
    if (storedAlphabet) {
      this.selectedAlphabet = storedAlphabet;
    }

    const storedSearchTerm = localStorage.getItem('searchTerm');
    if (storedSearchTerm) {
      this.searchTerm = storedSearchTerm;
    }
  }

  ngOnInit() {
    this.employeeService.employees$.subscribe((employees: Employee[]) => {
      this.employees = employees;
      this.filteredEmployees = employees;
      this.filterredEmployees = employees;
    });

    this.getEmployees();
  }

  ngOnDestroy() {}

  getEmployees() {
    this.employeeService.initiate();
  }

  updateFilteredEmployees(filteredEmployees: Employee[]): void {
    this.filteredEmployees = filteredEmployees;
  }

  hideEmployeeForm() {
    this.isFormVisible = false;
    this.editMode = false;
    this.selectedEmployee = null;
  }

  addEmployee(employee: Employee) {
    this.employeeService.addEmployee(employee);
    this.hideEmployeeForm();
  }

  updateEmployee(employee: Employee) {
    this.employeeService.updateEmployee(employee);
    this.hideEmployeeForm();
  }

  handleFilteredEmployees(filteredEmployees: Employee[]): void {
    this.filteredEmployees = filteredEmployees;
    console.log(filteredEmployees);
  }

  handleNavbarFilteredEmployees(filteredEmployees: Employee[]): void {
    this.filteredEmployees = filteredEmployees;
  }
}
