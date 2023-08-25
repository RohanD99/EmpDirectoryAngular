import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormGroup } from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})

export class CardContainerComponent implements OnInit {
  @Input() employees: Employee[] = [];
  selectedEmployee!: Employee;
  formGroup!: FormGroup;
  @Input() filteredEmployees: Employee[] = [];
  private allEmployees: Employee[] = [];

  constructor(private router: Router, private employeeService: EmployeeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadEmployees();
    this.filteredEmployees = this.allEmployees;
  }

  loadEmployees() {
    this.employees = this.employeeService.initiate();
  }
}