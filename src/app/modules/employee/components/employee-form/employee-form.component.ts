import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { NAME_PATTERN, EMAIL_PATTERN } from 'src/app/constants/constants';
import { Utility } from 'src/app/common/utility.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})

export class EmployeeFormComponent {
  @Input() employee!: Employee;
  @Output() addEmp: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Input() selectedEmployee!: Employee;
  @Output() updateEmp: EventEmitter<Employee> = new EventEmitter<Employee>();
  addClicked: boolean = false;
  @Output() formSubmit = new EventEmitter<any>();
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private utility: Utility,
  ) { }


  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      lastname: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      designation: ['', Validators.required],
      department: ['', Validators.required],
      mobile: ['', Validators.required],
      mailId: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      location: ['', Validators.required],
      skypeId: ['', Validators.required],
    });

    if (this.employee) {
      this.formGroup.patchValue(this.employee);
    }
  }

  closeForm() {
    this.formGroup.reset();
  }

  addEmployee(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.addClicked = true;
      return;
    }
    
    const employee = new Employee(this.employee);
    this.addEmp.emit(employee);
    this.employeeService.addEmployee(employee);
    this.formGroup.reset();
  }

  updateEmployee(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    if (this.selectedEmployee) {
      const updatedEmployee: Employee = {
        id: this.selectedEmployee.id,
        ...this.formGroup.value
      };

      this.employeeService.updateEmployee(updatedEmployee);
      this.updateEmp.emit(updatedEmployee);
    }
  }
}