import { Component, EventEmitter, Output  } from '@angular/core';
import { EmployeeService } from '../employee-services/employee.service';
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
    this.allEmployees= this.employeeService.loadEmployeesFromLocalStorage(); 
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
    
        if (departmentSegmentIndex !== -1 && urlSegments.length > departmentSegmentIndex + 1) {  //checks if dept seg exists in url
          const department = decodeURIComponent(urlSegments[departmentSegmentIndex + 1]);        //decodes dept val from URL by retreiving val
          this.applyFilters('department', department);
        } else if (departmentSegmentIndex !== -1) {              //if the dept segment exists in the URL but there is no value
          // If only 'department' segment is present 
          this.applyFilters('department', '');  
        }
    
        if (officesSegmentIndex !== -1 && urlSegments.length > officesSegmentIndex + 1) {
          const office = decodeURIComponent(urlSegments[officesSegmentIndex + 1]);
          this.applyFilters('offices', office);
        } else if (officesSegmentIndex !== -1) {
          // If only 'offices' segment is present 
          this.applyFilters('offices', '');
        }
    
        if (jobTitlesSegmentIndex !== -1 && urlSegments.length > jobTitlesSegmentIndex + 1) {
          const jobTitle = decodeURIComponent(urlSegments[jobTitlesSegmentIndex + 1]);
          this.applyFilters('jobTitles', jobTitle);
        } else if (jobTitlesSegmentIndex !== -1) {
          // If only 'jobTitles' segment is present 
          this.applyFilters('jobTitles', '');
        }
      }
    });    
    }
    
    applyFilters(filterType: string, filterValue: string): void {
      let filteredEmployees: any[] = [];
    
      switch (filterType) {
        case 'department':
          filteredEmployees = this.allEmployees.filter(employee => employee.department === filterValue);
          this.router.navigateByUrl(`/department/${filterValue}`);
          break;
    
        case 'offices':
          filteredEmployees = this.allEmployees.filter(employee => employee.location === filterValue);
          this.router.navigateByUrl(`/offices/${filterValue}`);
          break;
    
        case 'jobTitles':
          filteredEmployees = this.allEmployees.filter(employee => employee.designation === filterValue);
          this.router.navigateByUrl(`/jobTitles/${filterValue}`);
          break;
    
        default:
          break;
      }
    
      this.filteredEmployees$.emit(filteredEmployees);
    }   
}
