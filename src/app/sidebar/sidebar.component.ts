import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { CardContainerComponent } from '../card-container/card-container.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  departmentCounts: any = [];
  designationCounts: any = [];
  locationCounts: any = [];
  allEmployees: any[] = [];
  selectedDepartment: string = '';
  filteredEmployees: any[] = []; // Add the declaration of filteredEmployees property
  @Output() filteredEmployees$: EventEmitter<any[]> = new EventEmitter<any[]>();

  departments = [
    { id: 'it', name: 'IT', displayName: 'IT' },
    { id: 'humanResource', name: 'Human Resources', displayName: 'Human Resources' },
    { id: 'mdDept', name: 'MD', displayName: 'MD' },
    { id: 'salesDept', name: 'Sales', displayName: 'Sales' },
  ];

  offices = [
    { name: 'Seattle', displayName: 'Seattle' },
    { name: 'India', displayName: 'India' }
  ];

  jobTitles = [
    { name: 'SharePoint Practice Head', displayName: 'SharePoint Practice Head' },
    { name: '.Net Development Lead', displayName: '.Net Development Lead' },
    { name: 'Recruiting Expert', displayName: 'Recruiting Expert' },
    { name: 'Bi Developer', displayName: 'Bi Developer' },
    { name: 'Business Analyst', displayName: 'Business Analyst' }
  ];

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
    this.selectedDepartment = department;
    const filteredEmployees = this.allEmployees.filter(employee => employee.department === department);
    this.filteredEmployees$.emit(filteredEmployees);
  }
  
  filterEmployeesByOffice(office: string): void {
    this.filteredEmployees = this.allEmployees.filter(employee => employee.location === office);
    this.filteredEmployees$.emit(this.filteredEmployees);
  }

  filterEmployeesByJobTitle(jobTitle: string): void {
    this.filteredEmployees = this.allEmployees.filter(employee => employee.designation === jobTitle);
    this.filteredEmployees$.emit(this.filteredEmployees);
  }
}
