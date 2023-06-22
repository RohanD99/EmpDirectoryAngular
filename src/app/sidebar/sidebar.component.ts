import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { NavigationEnd, Router } from '@angular/router';

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
  filteredEmployees: any[] = [];                           // Add the declaration of filteredEmployees property
  @Output() filteredEmployees$: EventEmitter<any[]> = new EventEmitter<any[]>();

  departments = [
    { id: 'it', name: 'IT', displayName: 'IT' },
    { id: 'humanResource', name: 'Human Resources', displayName: 'Human Resources' },
    { id: 'mdDept', name: 'MD', displayName: 'MD' },
    { id: 'salesDept', name: 'SALES', displayName: 'Sales' },
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

  constructor(private employeeService: EmployeeService,private router: Router) { }

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

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlSegments = event.url.split('/');
        const departmentSegmentIndex = urlSegments.indexOf('department');
        const officesSegmentIndex = urlSegments.indexOf('offices');
        const jobTitlesSegmentIndex = urlSegments.indexOf('jobTitles');
    
        if (departmentSegmentIndex !== -1 && urlSegments.length > departmentSegmentIndex + 1) {
          const department = urlSegments[departmentSegmentIndex + 1];
          this.filterEmployeesByDepartment(department);
        } else if (departmentSegmentIndex !== -1) {
          // If only 'department' segment is present without a value, reset the filter
          this.filterEmployeesByDepartment('');
        }
    
        if (officesSegmentIndex !== -1 && urlSegments.length > officesSegmentIndex + 1) {
          const office = urlSegments[officesSegmentIndex + 1];
          this.filterEmployeesByOffice(office);
        } else if (officesSegmentIndex !== -1) {
          // If only 'offices' segment is present without a value, reset the filter
          this.filterEmployeesByOffice('');
        }
    
        if (jobTitlesSegmentIndex !== -1 && urlSegments.length > jobTitlesSegmentIndex + 1) {
          const jobTitle = urlSegments[jobTitlesSegmentIndex + 1];
          this.filterEmployeesByJobTitle(jobTitle);
        } else if (jobTitlesSegmentIndex !== -1) {
          // If only 'jobTitles' segment is present without a value, reset the filter
          this.filterEmployeesByJobTitle('');
        }
      }
    });
    
}

  filterEmployeesByDepartment(department: string): void {
    const filteredEmployees = this.allEmployees.filter(employee => employee.department === department);
    this.filteredEmployees$.emit(filteredEmployees);
    this.router.navigateByUrl(`/department/${department}`);
  }
  
  filterEmployeesByOffice(office: string): void {
    const filteredEmployees = this.allEmployees.filter(employee => employee.location === office);
    this.filteredEmployees$.emit(filteredEmployees);
    this.router.navigateByUrl(`/offices/${office}`);
  }
  
  filterEmployeesByJobTitle(jobTitle: string): void {
    const filteredEmployees = this.allEmployees.filter(employee => employee.designation === jobTitle);
    this.filteredEmployees$.emit(filteredEmployees);
    this.router.navigateByUrl(`/jobTitles/${jobTitle}`);
  }
}
