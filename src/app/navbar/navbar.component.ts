import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  filteredEmployees: any = {};
  characters: string[] = [];
  isFormVisible: boolean = false;
  @Input() employees: any[] = [];
  selectedCharacter: string = '';
  searchValue: string = '';
  noEmployeesMessage: string = '';

  addEmployee(employee: any): void {
    this.employees.push(employee);
    this.hideEmployeeForm();
  }

  showEmployeeForm() {
    this.isFormVisible = true;
  }

  hideEmployeeForm() {
    this.isFormVisible = false;
  }

  constructor() {
    this.generateAlphabet();
  }

  generateAlphabet() {
    const startCharCode = 'A'.charCodeAt(0);
    const endCharCode = 'Z'.charCodeAt(0);

    for (let charCode = startCharCode; charCode <= endCharCode; charCode++) {
      const character = String.fromCharCode(charCode);
      this.characters.push(character);
    }
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
    this.selectedCharacter = character === this.selectedCharacter ? '' : character;
    this.filterEmployees();
  }
  
  //Alphabets button
    filterEmployees(): void {
    console.log('Selected character:', this.selectedCharacter);

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
  
  


