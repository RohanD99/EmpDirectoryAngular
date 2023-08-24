import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee-services/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { NAME_PATTERN, EMAIL_PATTERN } from '../constants/constants';
import { Utility } from '../common/utility.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})

export class EmployeeFormComponent {
  @Input() isFormVisible: boolean = false;
  @Input() employee: Employee | undefined;
  @Output() addEmp: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Output() hideFormEvent = new EventEmitter<void>();
  @Input() selectedEmployee: any;
  @Input() editMode: boolean = false;
  @Output() updateEmp: EventEmitter<Employee> = new EventEmitter<Employee>();
  addClicked: boolean = false;
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private utility: Utility
  ) { }

  hideForm(): void {
    this.isFormVisible = false;
    this.hideFormEvent.emit();
  }

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

  getFormControlValue(controlName: string): any {                           
    const control = this.formGroup.get(controlName);
    return control ? control.value : null;
  }

  addEmployee(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.addClicked = true;
      return;
    }

    const firstname = this.utility.getFormControlValue(this.formGroup,'firstname');
    const lastname = this.utility.getFormControlValue(this.formGroup,'lastname');
    const designation = this.utility.getFormControlValue(this.formGroup,'designation');
    const department = this.utility.getFormControlValue(this.formGroup,'department');;
    const mobile = this.utility.getFormControlValue(this.formGroup,'mobile');
    const mailId = this.utility.getFormControlValue(this.formGroup,'mailId');
    const location = this.utility.getFormControlValue(this.formGroup,'location');
    const skypeId = this.utility.getFormControlValue(this.formGroup,'skypeId');

    const employee = new Employee(
      0,                                      
      firstname,
      lastname,
      designation,
      department,
      mobile,
      mailId,
      location,
      skypeId,
    );

    this.addEmp.emit(employee);
    this.employeeService.addEmployee(employee);
    this.formGroup.reset();
  }

  updateEmployee(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const selectedEmployeeId = this.selectedEmployee.id;                               //current selected emp
    const updatedEmployee = { id: selectedEmployeeId, ...this.formGroup.value };       //selected emp's data in edit form
    this.employeeService.updateEmployee(updatedEmployee);
    this.updateEmp.emit(updatedEmployee);                                              //update in emp-card comp
    this.hideForm();
  }
}