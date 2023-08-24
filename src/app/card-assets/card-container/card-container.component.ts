import { Component, EventEmitter, Output, Input, OnInit, OnDestroy  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee-services/employee.service';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { emptyEmpMessage } from 'src/app/constants/constants';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})

export class CardContainerComponent implements OnInit, OnDestroy {
  @Input() employees: Employee[] = [];
  @Output() noEmployeesMessageEvent = new EventEmitter<string>();
  isFormVisible: boolean = false;
  selectedEmployee: Employee | null = null;
  formGroup!: FormGroup;
  @Input() filteredEmployees: Employee[] = [];
  @Input() noEmployeesMessage: string = '';
  private employeesSubscription: Subscription;
  private allEmployees: Employee[] = [];
  department!: string;
  office!: string;
  jobTitle!: string;
  emptyMsg?: string;

  constructor(private router: Router, private employeeService: EmployeeService, private route: ActivatedRoute) {
    this.employeesSubscription = this.employeeService.employees$.subscribe((employees: Employee[]) => {
      this.allEmployees = employees;
      this.emptyMsg = emptyEmpMessage;
    });
  }

  ngOnDestroy() {
    this.employeesSubscription.unsubscribe();
  }

  openForm(employee: Employee): void {
    this.selectedEmployee = employee;
  }

  ngOnInit() {
    this.loadEmployees();
    this.filteredEmployees = this.allEmployees;
  }

  loadEmployees() {
    this.employees = this.employeeService.initiate();
  }
}