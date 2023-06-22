import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-employee-directory-container',
  templateUrl: './employee-directory-container.component.html',
  styleUrls: ['./employee-directory-container.component.css']
})

export class EmployeeDirectoryContainerComponent implements OnInit {
  isFormVisible: boolean = false;
  selectedEmployee: any = {};
  editMode: boolean = false;
  employees: any[] = [];
  @Input() noEmployeesMessage: Observable<string> = of('');
  filteredEmployees: any[] = [];
  selectedAlphabet: string = '';
  searchTerm: string = '';
  filterredEmployees: any[] = [];

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
    this.employeeService.employees$.subscribe((employees: any[]) => {
      this.employees = employees;
      this.filteredEmployees = employees;
      this.filterredEmployees = employees;
    });

    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployeesFromLocalStorage();
  }

  updateFilteredEmployees(filteredEmployees: any[]): void {
    this.filteredEmployees = filteredEmployees;
  }

  hideEmployeeForm() {
    this.isFormVisible = false;
    this.editMode = false;
    this.selectedEmployee = null;
  }

  addEmployee(employee: any) {
    this.employeeService.addEmployee(employee);
    this.hideEmployeeForm();
  }

  updateEmployee(employee: any) {
    this.employeeService.updateEmployee(employee);
    this.hideEmployeeForm();
  }

  handleFilteredEmployees(filteredEmployees: any[]): void {
    
    this.filteredEmployees = filteredEmployees;
    console.log(filteredEmployees);
  }


  handleNavbarFilteredEmployees(filteredEmployees: any[]): void {
    this.filteredEmployees = filteredEmployees;
  }

  handleFilteredofEmployees(filteredEmployees: any[]): void {
    this.filteredEmployees = filteredEmployees;
    this.noEmployeesMessage = of(filteredEmployees.length === 0 ? 'No employees found!' : '');
  }
  
}
