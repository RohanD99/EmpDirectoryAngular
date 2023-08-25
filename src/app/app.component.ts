import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EmployeeService } from './services/employee.service';
import { Employee } from './models/employee.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'EmpDirectoryAngular';
  isFormVisible: boolean = false;
selectedEmployee: Employee | null = null;

  employees: Employee[] = [];
  // selectedFilters: EployeeSelectedFilter;

  constructor(private employeeService: EmployeeService,) {
    this.selectedEmployee = new Employee({});
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  showEmployeeModal() {
    this.isFormVisible = true;
    const modal = document.getElementById('employeeModal');
    if (modal) {
        modal.classList.add('show'); // Add the 'show' class to display the modal
        modal.style.display = 'block'; // Set the display property to 'block'
    }
}

// Method to close the modal
hideEmployeeModal() {
    this.isFormVisible = false;
    const modal = document.getElementById('employeeModal');
    if (modal) {
        modal.classList.remove('show'); // Remove the 'show' class
        modal.style.display = 'none'; // Set the display property to 'none'
    }
}
  getEmployees() {
    this.employeeService.initiate();
  }

  updateFilteredEmployees(filteredEmployees: Employee[]): void {
    // this.filteredEmployees = filteredEmployees;
  }

  showForm(employee: Employee | null = null) {
    this.selectedEmployee = employee;
    this.isFormVisible = true;
  }
  
  hideForm() {
    this.selectedEmployee = null;
    this.isFormVisible = false;
  }

  addEmployee(employee: Employee) {
    this.employeeService.addEmployee(employee);
    this.hideForm();
  }
  
  updateEmployee(employee: Employee) {
    this.employeeService.updateEmployee(employee);
    this.hideForm();
  }

  handleFilteredEmployees(filteredEmployees: Employee[]): void {
    // this.filteredEmployees = filteredEmployees;
    console.log(filteredEmployees);
  }

  handleNavbarFilteredEmployees(filteredEmployees: Employee[]): void {
    // this.filteredEmployees = filteredEmployees;
  }
}
