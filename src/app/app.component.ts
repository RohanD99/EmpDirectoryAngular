import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './services/employee.service';
import { Employee, EmployeeSelectedFilter } from './models/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  employees: Array<Employee> = [];
  filteredEmployees: Array<Employee> = [];
  departments: Array<string> = [];
  designation: Array<string> = [];
  location: Array<string> = [];
  selectedFilters: EmployeeSelectedFilter = new EmployeeSelectedFilter();
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.initApp();
  }

  initApp() {
    this.getEmployees();
    this.setFilters();
  }

  getEmployees(): Employee[] {
    this.employees = this.employeeService.getAll();
    return this.employees;
  }

  save(employee: Employee): void {
    this.employeeService.save(employee); 
    this.employees = this.employeeService.getAll(); 
  }

  delete(employee: Employee): void{
    this.employeeService.deleteEmployee(employee.id);
    this.employees = this.employeeService.getAll();
  }

  showAllEmployeesHandler(): void {
    this.getEmployees();
  }

  updateEmployeeHandler(updatedEmployee: Employee): void {
    this.save(updatedEmployee);
  }

  setFilters() {
    this.selectedFilters.departments = [...new Set(this.employees.map(employee => employee.department))];
    this.selectedFilters.designation = [...new Set(this.employees.map(employee => employee.designation))];
    this.selectedFilters.location = [...new Set(this.employees.map(employee => employee.location))];
  }

  //on searchbar
  filterEmployeesBySearch(searchValue: string, filterBy: string, selectedFilters: EmployeeSelectedFilter): void {
    let employees = this.employeeService.getAll();
    this.filteredEmployees = employees.filter((employee: { firstname: string, designation: string, department: string }) => {
      let searchProperty: string;
      if (filterBy === 'preferredName') {
        searchProperty = employee.firstname.toLowerCase();
      } else if (filterBy === 'designation') {
        searchProperty = employee.designation.toLowerCase();
      } else if (filterBy === 'department') {
        searchProperty = employee.department.toLowerCase();
      } else {
        searchProperty = employee.firstname.toLowerCase();
      }

      return searchProperty.includes(searchValue);
    });
  }

  searchHandler(eventData: { searchValue: string, filterBy: string }): void {
    const { searchValue, filterBy } = eventData;
    this.filterEmployeesBySearch(searchValue, filterBy, this.selectedFilters);
  }

  handleNavbarFilteredEmployees(filteredEmployees: Employee[]): void {
    this.filteredEmployees = filteredEmployees;
  }

  //By clcking Alphabets 
  filterEmployeesByStartingLetter(startingLetter: string): void {
    this.filteredEmployees = this.filteredEmployees.filter(employee =>
      employee.firstname.charAt(0).toLowerCase() === startingLetter.toLowerCase()
    );
  }

  characterSelectHandler(selectedCharacter: string): void {
    this.filterEmployeesByStartingLetter(selectedCharacter);
  }

  //displaying dynamic titles
  applyFilters(filterType: string, filterValue: string): void {
    const filtersMap: { [key: string]: keyof EmployeeSelectedFilter } = {
      'department': 'departments',
      'offices': 'location',
      'jobTitles': 'designation'
    };
  }

  applyFiltersHandler(event: { filterType: string, filterValue: string }): void {
    this.applyFilters(event.filterType, event.filterValue);
  }
}
