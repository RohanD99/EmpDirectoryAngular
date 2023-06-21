import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  filtereddEmployees: { firstname: string, designation: string, department: string }[] = []; // Filtering employees based on filters
  characters: string[] = [];         // Selected characters on button
  isFormVisible: boolean = false;     
  @Input() employees: any[] = [];    // Send to card-cont.
  selectedCharacter: string = '';    // Initially empty character string
  searchValue: string = '';          // Initially empty search value string
  noEmployeesMessage: string = '';   // Displayed in card-cont
  @Output() filteredEmployeesEvent = new EventEmitter<any[]>();

  constructor(private employeeService: EmployeeService, private router: Router) {
    this.generateAlphabet();
    this.filtereddEmployees = this.employees; // Initialize filteredEmployees with all employees
  }

  generateAlphabet() { // Generate alphabet buttons
    const startCharCode = 'A'.charCodeAt(0);
    const endCharCode = 'Z'.charCodeAt(0);

    for (let charCode = startCharCode; charCode <= endCharCode; charCode++) {
      const character = String.fromCharCode(charCode);
      this.characters.push(character);
    }
  }

  showAllEmployees(): void {
    console.log("Clicked");
    this.selectedCharacter = '';
    const employeesFromLocalStorageString = localStorage.getItem('employees');
    this.filtereddEmployees = employeesFromLocalStorageString ? JSON.parse(employeesFromLocalStorageString) : [];

    if (this.filtereddEmployees.length === 0) {
      this.noEmployeesMessage = 'No employees found!';
    } else {
      this.noEmployeesMessage = '';
    }
    this.paginationFilter();
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    const searchValue = target.value.trim().toLowerCase();
    const filterBy = (document.getElementById('filterBy') as HTMLSelectElement).value;
  
    const employeesFromLocalStorageString = localStorage.getItem('employees');
    const employeesFromLocalStorage = employeesFromLocalStorageString ? JSON.parse(employeesFromLocalStorageString) : [];
  
    this.filtereddEmployees = employeesFromLocalStorage.filter((employee: { firstname: string, designation: string, department: string }) => {
      let searchProperty: string;
      if (filterBy === 'firstName') {
        searchProperty = employee.firstname.toLowerCase();
      } else if (filterBy === 'designation') {
        searchProperty = employee.designation.toLowerCase();
      } else if (filterBy === 'department') {
        searchProperty = employee.department.toLowerCase();
      } else {
        // Default to firstname
        searchProperty = employee.firstname.toLowerCase();
      }
  
      return searchProperty.includes(searchValue);
    });
  
    if (this.filtereddEmployees.length === 0) {
      this.noEmployeesMessage = 'No employees found!';
    } else {
      this.noEmployeesMessage = '';
    }
  
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


  paginationFilter(): void {
    const employeesFromLocalStorageString = localStorage.getItem('employees');
    const employeesFromLocalStorage = employeesFromLocalStorageString ? JSON.parse(employeesFromLocalStorageString) : [];
    const filteredEmployees = employeesFromLocalStorage.filter((employee: { firstname: string }) => {
      const startsWithCharacter = !this.selectedCharacter ||
        employee.firstname.charAt(0).toLowerCase() === this.selectedCharacter.toLowerCase();
      return startsWithCharacter;
    });
    this.filteredEmployeesEvent.emit(filteredEmployees);
  }
  
  addEmployee(employee: any): void {
    this.employees.push(employee);
    this.hideEmployeeForm();
  }

  updateEmployee(updatedEmployee: any): void {
    this.employeeService.updateEmployee(updatedEmployee);
  }

  showEmployeeForm() {
    this.isFormVisible = true;
    this.router.navigateByUrl('/add');
  }

  hideEmployeeForm() {
    this.isFormVisible = false;
  }
}
