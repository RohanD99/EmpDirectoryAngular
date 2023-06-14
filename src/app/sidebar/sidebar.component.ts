import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  departmentCounts: any = {};
  designationCounts: any = {};
  locationCounts: any = {};

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
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
}
