import { Component, Input, Output, EventEmitter, Inject, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/employee';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})

export class EmployeeFormComponent {
  @Input() employee!: Employee;
  @Output() addEmp: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Input() selectedEmployee!: Employee;
  @Output() updateEmp: EventEmitter<Employee> = new EventEmitter<Employee>();
  formGroup!: FormGroup;
  isEditing: boolean = false;

  constructor(
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required],
      mobile: ['', Validators.required],
      mailId: ['', [Validators.required, Validators.email]],
      location: ['', Validators.required],
      skypeId: ['', Validators.required]
    });

    if (this.employee) {
      this.formGroup.patchValue(this.employee);
    }
    this.isEditing = false;
  }

  isFieldInvalid(fieldName: string) {
    const control = this.formGroup.get(fieldName);
    return control?.invalid && (control?.touched || control?.dirty);
  }

  addEmployee(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const newEmployee: Employee = {
      ...this.formGroup.value,
    };

    this.addEmp.emit(newEmployee);
    this.formGroup.reset();
  }

  updateEmployee(): void {
    if (this.formGroup.valid) {
      const updatedEmployee: Employee = this.formGroup.value;
      updatedEmployee.id = this.employee.id;
      this.formGroup.reset();
    }
  }
}