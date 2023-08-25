import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { EmployeeService } from '../../../../services/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../../../../models/employee.model';
import { Utility } from '../../../../common/utility.service';
import { EmployeeSelectedFilter } from '../../../../models/employee.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  selectedFilters: EmployeeSelectedFilter = new EmployeeSelectedFilter(); // Initialize the filter
  filteredEmployees: Employee[] = [];
  filtereddEmployees: { firstname: string, designation: string, department: string }[] = [];    //Filtering employees based on filters
  characters: string[] = [];         // Selected characters on button
  @Input() employees: Employee[] = [];    // Send to card-cont.
  selectedCharacter: string = '';    // Initially empty character string
  searchValue: string = '';          // Initially empty search value string
  @Output() filteredEmployeesEvent = new EventEmitter<any[]>();
  noEmployeesMessage: string = '';

  constructor(private employeeService: EmployeeService, private router: Router, private utility: Utility) {
    this.characters = this.utility.generateAlphabets();
    this.filtereddEmployees = this.employees;                // Initialize filteredEmployees with all employees
  }

  showAllEmployees(): void {
    this.selectedCharacter = '';
    const employees = this.employeeService.loadEmployeesFromLocalStorage();
    this.filtereddEmployees = employees ? employees : [];
    this.paginationFilter();
  }

  openEmployeeModal() {
    this.employeeService.openEmployeeFormModal();
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    const searchValue = target.value.trim().toLowerCase();
    const filterBy = (document.getElementById('filterBy') as HTMLSelectElement).value;

    const employees = this.employeeService.loadEmployeesFromLocalStorage();
    this.filtereddEmployees = employees.filter((employee: { firstname: string, designation: string, department: string }) => {
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

    this.filteredEmployeesEvent.emit(this.filtereddEmployees);
  }


  onClearAll(): void {
    this.searchValue = '';
    this.paginationFilter();
  }

  selectCharacter(character: string): void {
    if (this.selectedCharacter === character) {
      return;
    }
    this.selectedCharacter = character;
    this.paginationFilter();
  }

  //Alphabets filter
  paginationFilter(): void {
    const employees = this.employeeService.loadEmployeesFromLocalStorage();
    const filteredEmployees = employees.filter((employee: Employee) => {
      const startsWithCharacter = !this.selectedCharacter ||
        employee.firstname.charAt(0).toLowerCase() === this.selectedCharacter.toLowerCase();

      const matchesJobTitle = this.selectedFilters.jobtitle.length === 0 ||
        this.selectedFilters.jobtitle.includes(employee.designation);

      const matchesDepartment = this.selectedFilters.departments.length === 0 ||
        this.selectedFilters.departments.includes(employee.department);

      const matchesOffice = this.selectedFilters.offices.length === 0 ||
        this.selectedFilters.offices.includes(employee.location);

      return startsWithCharacter && matchesJobTitle && matchesDepartment && matchesOffice;
    });

    this.filteredEmployees = filteredEmployees;
    this.filteredEmployeesEvent.emit(this.filteredEmployees);
  }
  addEmployee(employee: Employee): void {
    this.employees.push(employee);
  }

  updateEmployee(updatedEmployee: Employee): void {
    //this.employeeService.updateEmployee(updatedEmployee);
  }

  showEmployeeForm() {
    this.utility.openForm(); // Assuming this triggers your "isFormVisible" property
  }

  showEmployeeModal() {
    const modal = document.getElementById('employeeModal');
    if (modal) {
        modal.classList.add('show'); // Add the 'show' class to display the modal
        modal.style.display = 'block'; // Set the display property to 'block'
    }
}

// Method to close the modal
hideEmployeeModal() {
    const modal = document.getElementById('employeeModal');
    if (modal) {
        modal.classList.remove('show'); // Remove the 'show' class
        modal.style.display = 'none'; // Set the display property to 'none'
    }
}

  excludeMatchingNames(employees: Employee[], searchValue: string, filterBy: string): Employee[] {
    return employees.filter((employee: { firstname: string, designation: string, department: string }) => {
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

      const matchesPreferredName = filterBy !== 'preferredName' && employee.firstname.toLowerCase().includes(searchValue);
      const matchesDepartment = filterBy !== 'department' && employee.department.toLowerCase().includes(searchValue);
      const matchesDesignation = filterBy !== 'designation' && employee.designation.toLowerCase().includes(searchValue);

      return searchProperty.includes(searchValue) && !matchesPreferredName && !matchesDepartment && !matchesDesignation;
    });
  }

}
