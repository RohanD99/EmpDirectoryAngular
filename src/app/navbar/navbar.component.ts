import { Component, Input } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  filteredEmployees: any = {};   //filtering emp based on filter
  characters: string[] = [];       //selected char on button
  isFormVisible: boolean = false; 
  @Input() employees: any[] = [];    //send to card-cont.
  selectedCharacter: string = '';    //firstly empty char string
  searchValue: string = '';          //firstly empty searchVal string
  noEmployeesMessage: string = '';   //Displaying in card-cont

  addEmployee(employee: any): void {
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

  constructor(private employeeService: EmployeeService,private router: Router) {
    this.generateAlphabet();
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
    console.log("clciked")
    this.selectedCharacter = '';
    this.filterEmployees();
  }

  //Search bar 
  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    const searchValue = target.value.trim().toLowerCase();
    const filterBy = (document.getElementById('filterBy') as HTMLSelectElement).value;
  
    const employeesFromLocalStorageString = localStorage.getItem('employees');
    const employeesFromLocalStorage = employeesFromLocalStorageString ? JSON.parse(employeesFromLocalStorageString) : [];
  
    this.filteredEmployees = employeesFromLocalStorage.filter((employee: { preferredName: string, designation: string, department: string }) => {
      let searchProperty: string;
      if (filterBy === 'preferredName') {
        searchProperty = employee.preferredName.toLowerCase();
      } else if (filterBy === 'designation') {
        searchProperty = employee.designation.toLowerCase();
      } else if (filterBy === 'department') {
        searchProperty = employee.department.toLowerCase();
      } else {
        // Default to preferredName 
        searchProperty = employee.preferredName.toLowerCase();
      }
  
      return searchProperty.includes(searchValue);
    });
  
    if (this.filteredEmployees.length === 0) {
      this.noEmployeesMessage = 'No employees found!';
    } else {
      this.noEmployeesMessage = '';
    }
  } 
  
  onClearAll(): void {
    this.searchValue = '';
    this.filterEmployees();
  }
  
  selectCharacter(character: string): void {
    if (this.selectedCharacter === character) {
      this.selectedCharacter = '';
    } else {
      this.selectedCharacter = character;
      this.filterEmployees();
    }
  }
  
  
  //Alphabets button
  filterEmployees(): void {
    const employeesFromLocalStorageString = localStorage.getItem('employees');
    const employeesFromLocalStorage = employeesFromLocalStorageString ? JSON.parse(employeesFromLocalStorageString) : [];
  
    this.filteredEmployees = employeesFromLocalStorage.filter((employee: { preferredName: string }) => {
      const startsWithCharacter = !this.selectedCharacter ||
        employee.preferredName.charAt(0).toLowerCase() === this.selectedCharacter.toLowerCase();
      console.log('Employee:', employee);
      console.log('Starts with character:', startsWithCharacter);
  
      return startsWithCharacter;
    });
  
    console.log('Filtered employees:', this.filteredEmployees);
  
    if (this.filteredEmployees.length === 0) {
      this.noEmployeesMessage = 'No employees found!!';
    } else {
      this.noEmployeesMessage = '';
    }
  }
  
  
  
  
  
  
  
  
}
  
  

