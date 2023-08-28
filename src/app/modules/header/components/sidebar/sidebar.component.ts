import { Component, EventEmitter, Output } from '@angular/core';
import { EmployeeService } from '../../../../services/employee.service';
import { NavigationEnd, Router } from '@angular/router';
import { Employee } from '../../../../models/employee.model';
import { EmployeeSelectedFilter } from '../../../../models/employee.model';
import { emptyEmpMessage } from 'src/app/constants/constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent {
  selectedFilters: EmployeeSelectedFilter = new EmployeeSelectedFilter();
  departments: string[] = [];
  offices: string[] = [];
  jobTitles: string[] = [];
  departmentCounts: { [key: string]: number } = {};
  designationCounts: { [key: string]: number } = {};
  locationCounts: { [key: string]: number } = {};
  allEmployees: Employee[] = [];
  selectedDepartment: string = '';
  sections: { heading: string, items: any[] }[] = [];
  filteredEmployees: Employee[] = [];
  @Output() filteredEmployees$: EventEmitter<Employee[]> = new EventEmitter<Employee[]>();
  emptyEmpMessage = emptyEmpMessage;

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.allEmployees = this.employeeService.loadEmployeesFromLocalStorage();
    //For Counts
    this.departments = [...new Set(this.allEmployees.map(employee => employee.department))];
    this.offices = [...new Set(this.allEmployees.map(employee => employee.location))];
    this.jobTitles = [...new Set(this.allEmployees.map(employee => employee.designation))];

    //For Dynamic titles
    this.sections = [
      {
        heading: 'Departments',
        items: this.departments.map(departmentName => ({
          type: 'department',
          name: departmentName,
          displayName: departmentName,
          id: departmentName,
          routerLink: `/department/${departmentName}`,
          count: this.departmentCounts[departmentName] || 0,
        })),
      },
      {
        heading: 'Offices',
        items: this.offices.map(officeName => ({
          type: 'offices',
          name: officeName,
          displayName: officeName,
          id: officeName,
          routerLink: `/offices/${officeName}`,
          count: this.locationCounts[officeName] || 0,
        })),
      },
      {
        heading: 'Job Titles',
        items: this.jobTitles.map(jobTitleName => ({
          type: 'jobTitles',
          name: jobTitleName,
          displayName: jobTitleName,
          id: jobTitleName,
          routerLink: `/jobTitles/${jobTitleName}`,
          count: this.designationCounts[jobTitleName] || 0,
        })),
      },
    ];

    //routing
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const urlSegments = event.url.split('/');
        const departmentSegmentIndex = urlSegments.indexOf('department');
        const officesSegmentIndex = urlSegments.indexOf('offices');
        const jobTitlesSegmentIndex = urlSegments.indexOf('jobTitles');

        if (departmentSegmentIndex !== -1 && urlSegments.length > departmentSegmentIndex + 1) {
          const department = decodeURIComponent(urlSegments[departmentSegmentIndex + 1]);
          this.applyFilters('department', department);
        } else if (departmentSegmentIndex !== -1) {
          this.applyFilters('department', '');
        }

        if (officesSegmentIndex !== -1 && urlSegments.length > officesSegmentIndex + 1) {
          const office = decodeURIComponent(urlSegments[officesSegmentIndex + 1]);
          this.applyFilters('offices', office);
        } else if (officesSegmentIndex !== -1) {
          this.applyFilters('offices', '');
        }

        if (jobTitlesSegmentIndex !== -1 && urlSegments.length > jobTitlesSegmentIndex + 1) {
          const jobTitle = decodeURIComponent(urlSegments[jobTitlesSegmentIndex + 1]);
          this.applyFilters('jobTitles', jobTitle);
        } else if (jobTitlesSegmentIndex !== -1) {
          this.applyFilters('jobTitles', '');
        }
      }
    });
  }

  applyFilters(filterType: string, filterValue: string): void {
    switch (filterType) {
      case 'department':
        this.selectedFilters.departments = [filterValue];
        this.router.navigateByUrl(`/department/${filterValue}`);
        break;

      case 'offices':
        this.selectedFilters.offices = [filterValue];
        this.router.navigateByUrl(`/offices/${filterValue}`);
        break;

      case 'jobTitles':
        this.selectedFilters.jobtitle = [filterValue];
        this.router.navigateByUrl(`/jobTitles/${filterValue}`);
        break;

      default:
        break;
    }

    this.filterEmployeesBySelectedFilters();
    if (this.filteredEmployees.length === 0) {
      this.emptyEmpMessage;
    }
  }

  

  filterEmployeesBySelectedFilters(): void {
    this.filteredEmployees = this.allEmployees.filter(employee => {
      const matchesJobTitle = this.selectedFilters.jobtitle.length === 0 ||
        this.selectedFilters.jobtitle.includes(employee.designation);

      const matchesDepartment = this.selectedFilters.departments.length === 0 ||
        this.selectedFilters.departments.includes(employee.department);

      const matchesOffice = this.selectedFilters.offices.length === 0 ||
        this.selectedFilters.offices.includes(employee.location);

      return matchesJobTitle && matchesDepartment && matchesOffice;
    });

    this.filteredEmployees$.emit(this.filteredEmployees);
    if (this.filteredEmployees.length === 0) {
      this.emptyEmpMessage;
    }
  }
}
