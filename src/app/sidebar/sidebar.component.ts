import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  departmentCounts: any = [];
  designationCounts: any = [];
  locationCounts: any = [];
  filteredEmployees: any[] = [];
  allEmployees: any[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
  const employeesFromLocalStorage = localStorage.getItem('employees');
  if (employeesFromLocalStorage) {
    this.allEmployees = JSON.parse(employeesFromLocalStorage);
  }
    this.employeeService.updateCounts();
  
    this.employeeService.departmentCounts$.subscribe(counts => {
      this.departmentCounts = counts;
    });
  
    this.employeeService.designationCounts$.subscribe(counts => {
      this.designationCounts = counts;
    });
  
    this.employeeService.locationCounts$.subscribe(counts => {
      this.locationCounts = counts;
    });
  }

  filterEmployeesByDepartment(department: string): void {
    this.filteredEmployees = this.allEmployees.filter(employee => employee.department === department);
    console.log(this.filteredEmployees);
  }
  
}


