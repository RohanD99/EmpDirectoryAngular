import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  filteredEmployeesNavbar: { preferredName: string, designation: string, department: string }[] = []; //filtering emp based on filter
  characters: string[] = [];         //selected char on button
  isFormVisible: boolean = false; 
  @Input() employees: any[] = [];    //send to card-cont.
  selectedCharacter: string = '';    //firstly empty char string
  searchValue: string = '';          //firstly empty searchVal string
  noEmployeesMessage: string = '';   //Displaying in card-cont
  @Output() filteredEmployeesEvent: EventEmitter<any[]> = new EventEmitter<any[]>();
  
  
  addEmployee(employee: any): void {
    debugger
    this.employees.push(employee);
    this.hideEmployeeForm();
  }

  updateEmployee(updatedEmployee: any): void {
    this.employeeService.updateEmployee(updatedEmployee);
  }

  showEmployeeForm() {
    this.isFormVisible = true;
    
  }

  hideEmployeeForm() {
    this.isFormVisible = false;
  }

  constructor(private employeeService: EmployeeService, private router: Router) {
    this.generateAlphabet();
    this.filteredEmployeesNavbar = this.employees; // Initialize filteredEmployees with all employees
     // Initialize filteredEmployees with all employees
  this.selectedCharacter = ''; // Add this line to initialize selectedCharacter
  this.searchValue = '';
  }

  generateAlphabet() {                     //Generating alphabets button
    const startCharCode = 'A'.charCodeAt(0);
    const endCharCode = 'Z'.charCodeAt(0);

    for (let charCode = startCharCode; charCode <= endCharCode; charCode++) {
      const character = String.fromCharCode(charCode);
      this.characters.push(character);
    }
  }

  showAllEmployees(): void {
    console.log("clicked")
    this.selectedCharacter = '';
    const employeesFromLocalStorageString = localStorage.getItem('employees');
  this.filteredEmployeesNavbar = employeesFromLocalStorageString ? JSON.parse(employeesFromLocalStorageString) : [];
  }

  //Search bar 
  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target && target.value) {
      const searchValue = target.value.trim().toLowerCase();
      const filterBy = (document.getElementById('filterBy') as HTMLSelectElement).value;
  
      const employeesFromLocalStorageString = localStorage.getItem('employees');
      const employeesFromLocalStorage = employeesFromLocalStorageString ? JSON.parse(employeesFromLocalStorageString) : [];
  
      this.filteredEmployeesNavbar = employeesFromLocalStorage.filter((employee: { preferredName?: string, designation?: string, department?: string }) => {
        let searchProperty: string;
        if (filterBy === 'preferredName' && employee.preferredName) {
          searchProperty = employee.preferredName.toLowerCase();
        } else if (filterBy === 'designation' && employee.designation) {
          searchProperty = employee.designation.toLowerCase();
        } else if (filterBy === 'department' && employee.department) {
          searchProperty = employee.department.toLowerCase();
        } else {
          // Default to preferredName 
          searchProperty = employee.preferredName ? employee.preferredName.toLowerCase() : '';
        }
      
        return searchProperty.includes(searchValue);
      });
      
      if (this.filteredEmployeesNavbar.length === 0) {
        this.noEmployeesMessage = 'No employees found!';
      } else {
        this.noEmployeesMessage = '';
      }
      
    }
  }
  
  // updateDisplayedEmployees(): void {
  //   this.employees = this.filteredEmployees;
  // }
  
  onClearAll(): void {
    this.searchValue = '';
    const employeesFromLocalStorageString = localStorage.getItem('employees');
  this.filteredEmployeesNavbar = employeesFromLocalStorageString ? JSON.parse(employeesFromLocalStorageString) : [];
  }
  
  selectCharacter(character: string): void {
    if (this.selectedCharacter === character) {
      this.selectedCharacter = '';
    } else {
      this.selectedCharacter = character;
    }
  }
  
  //Alphabets button
  filterEmployeesNavbar(): void {
    console.log('Selected character:', this.selectedCharacter);

    const employeesFromLocalStorageString = localStorage.getItem('employees');
    const employeesFromLocalStorage = employeesFromLocalStorageString ? JSON.parse(employeesFromLocalStorageString) : [];

    this.filterEmployeesNavbar = employeesFromLocalStorage.filter((employee: { preferredName: string }) => {
      const startsWithCharacter = !this.selectedCharacter ||
        employee.preferredName.charAt(0).toLowerCase() === this.selectedCharacter.toLowerCase();

      console.log('Employee:', employee);
      console.log('Starts with character:', startsWithCharacter);
    })
  }
}
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  
  

