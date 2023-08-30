import { Component, EventEmitter, Inject, Input, Output, ViewChild, forwardRef } from '@angular/core';
import { EmployeeSelectedFilter } from 'src/app/models/employee';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent {
  @Input() departments: string[] = [];
  @Input() designation: string[] = [];
  @Input() location: string[] = [];
  @Output() applyFiltersEvent: EventEmitter<{ filterType: string, filterValue: string }> = new EventEmitter<{ filterType: string, filterValue: string }>();

  selectedFilters: EmployeeSelectedFilter = new EmployeeSelectedFilter();
  departmentCounts: { [key: string]: number } = {};
  designationCounts: { [key: string]: number } = {};
  locationCounts: { [key: string]: number } = {};
  sections: { heading: string, items: any[] }[] = [];

  constructor() { }

  ngOnInit(): void {
    //For Dynamic titles
    this.sections = [
      {
        heading: 'Departments',
        items: this.selectedFilters.departments.map(departmentName => ({
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
        items: this.selectedFilters.location.map(officeName => ({
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
        items: this.selectedFilters.designation.map(jobTitleName => ({
          type: 'jobTitles',
          name: jobTitleName,
          displayName: jobTitleName,
          id: jobTitleName,
          routerLink: `/jobTitles/${jobTitleName}`,
          count: this.designationCounts[jobTitleName] || 0,
        })),
      },
    ];
  }

  applyFilters(filterType: string, filterValue: string): void {
    this.applyFiltersEvent.emit({ filterType, filterValue });
  }
}
