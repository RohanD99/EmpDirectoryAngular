import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeService } from '../../../../services/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../../../../models/employee.model';
import { Utility } from '../../../../common/utility.service';
import { EmployeeSelectedFilter } from '../../../../models/employee.model';
import { emptyEmpMessage } from 'src/app/constants/constants';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  selectedFilters: EmployeeSelectedFilter = new EmployeeSelectedFilter(); // Initialize the filter
  filteredEmployees: Employee[] = [];
  characters: string[] = [];                                              // Selected characters on button
  @Input() employees: Employee[] = [];                                    // Send to card-cont.
  selectedCharacter: string = '';                                         // Initially empty character string
  searchValue: string = '';                                               // Initially empty search value string
  @Output() filteredEmployeesEvent = new EventEmitter<any[]>();
  emptyEmpMessage = emptyEmpMessage;

  constructor(private employeeService: EmployeeService, private router: Router, private utility: Utility,private modalRef: NgbModalRef) {
    this.characters = this.utility.generateAlphabets();
    this.filteredEmployees = this.employees; 
  }

  showAllEmployees(): void {
    this.selectedCharacter = '';
    const employees = this.employeeService.loadEmployeesFromLocalStorage();
    this.filteredEmployees = employees ? employees : [];
    this.paginationFilter();
  }

  openEmployeeModal() {
    this.employeeService.openEmployeeFormModal();
  }

  closeEmployeeModal(){
    this.employeeService.closeEmployeeFormModal(this.modalRef);
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    const searchValue = target.value.trim().toLowerCase();
    const filterBy = (document.getElementById('filterBy') as HTMLSelectElement).value;

    const employees = this.employeeService.loadEmployeesFromLocalStorage();
    this.filteredEmployees = employees.filter((employee: Employee) => {
      const searchProperty =
        filterBy === 'preferredName' ? employee.firstname.toLowerCase() :
        filterBy === 'designation' ? employee.designation.toLowerCase() :
        filterBy === 'department' ? employee.department.toLowerCase() :
        employee.firstname.toLowerCase();

      return searchProperty.includes(searchValue);
    });

    if (this.filteredEmployees.length === 0) {
      this.emptyEmpMessage;
    }

    this.filteredEmployeesEvent.emit(this.filteredEmployees);
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
    if (this.filteredEmployees.length === 0) {
      this.emptyEmpMessage;
    }
  }

  // Alphabets filter
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
    this.employeeService.updateEmployee(updatedEmployee);
  }

  excludeMatchingNames(employees: Employee[], searchValue: string, filterBy: string): Employee[] {
    return employees.filter((employee: Employee) => {
      const searchProperty =
        filterBy === 'preferredName' ? employee.firstname.toLowerCase() :
        filterBy === 'designation' ? employee.designation.toLowerCase() :
        filterBy === 'department' ? employee.department.toLowerCase() :
        employee.firstname.toLowerCase();

      const matchesPreferredName = filterBy !== 'preferredName' && employee.firstname.toLowerCase().includes(searchValue);
      const matchesDepartment = filterBy !== 'department' && employee.department.toLowerCase().includes(searchValue);
      const matchesDesignation = filterBy !== 'designation' && employee.designation.toLowerCase().includes(searchValue);

      return searchProperty.includes(searchValue) && !matchesPreferredName && !matchesDepartment && !matchesDesignation;
    });
  }
}
