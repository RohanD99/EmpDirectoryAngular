import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})

export class EmployeeFormComponent {
  @Input() isFormVisible: boolean = false;
  @Input() employee: any;
  @Output() addEmp: EventEmitter<any> = new EventEmitter<any>();
  @Output() hideFormEvent = new EventEmitter<void>();
  @Input() selectedEmployee: any = {}; 
  @Input() editMode: boolean = false;
  @Output() updateEmp: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeFormEvent = new EventEmitter<void>();

  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService,private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['employee']) {
      this.formGroup.reset();
      if (this.employee) {
        this.formGroup.patchValue(this.employee);
        this.editMode = true;
      }else{
        this.editMode = false;
      }
    }
  }

hideForm(): void {
  this.isFormVisible = false
  this.hideFormEvent.emit();
  console.log("in")
}

closeForm(): void {
  this.closeFormEvent.emit();
}


  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern('[A-Za-z]+')]],
      lastname: ['', [Validators.required, Validators.pattern('[A-Za-z]+')]],
      designation: ['', Validators.required],
      department: ['', Validators.required],
      mobile: ['', Validators.required],
      mailId: ['', [Validators.required, Validators.email]],
      location: ['', Validators.required],
      skypeId: ['', Validators.required],
    });

    if (this.employee) {
      this.formGroup.patchValue(this.employee);
    }
  }

  addEmployee(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    const firstname = this.formGroup.get('firstname')?.value;
    const lastname = this.formGroup.get('lastname')?.value;
    const designation = this.formGroup.get('designation')?.value;
    const department = this.formGroup.get('department')?.value;
    const mobile = this.formGroup.get('mobile')?.value;
    const mailId = this.formGroup.get('mailId')?.value;
    const location = this.formGroup.get('location')?.value;
    const skypeId = this.formGroup.get('skypeId')?.value;

    const employee = {
      firstname: firstname,
      lastname: lastname,
      designation: designation,
      department: department,
      mobile: mobile,
      mailId: mailId,
      location: location,
      skypeId: skypeId,
      preferredName: firstname + ' ' + lastname,
    };

    this.addEmp.emit(employee);
    this.employeeService.addEmployee(employee);
    this.formGroup.reset();
    // this.closeForm();
  }

  updateEmployee(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
  
    const updatedEmployee = { ...this.employee, ...this.formGroup.value };
    console.log('Updated Employee:', updatedEmployee);
    this.employeeService.updateEmployee(updatedEmployee);
    this.updateEmp.emit(updatedEmployee);
    this.hideForm();
  }
  
  
  validateFname() {
    const firstNameControl = this.formGroup.get('firstname');
    if (firstNameControl?.invalid && (firstNameControl.dirty || firstNameControl.touched)) {
      return {
        'is-invalid': firstNameControl.errors && firstNameControl.errors['required'],
        'is-valid': firstNameControl.errors && firstNameControl.errors['pattern']
      };
    }
    return {};
  }

  validateLname() {
    const lastNameControl = this.formGroup.get('lastname');
    if (lastNameControl?.invalid && (lastNameControl.dirty || lastNameControl.touched)) {
      return {
        'is-invalid': lastNameControl.errors && lastNameControl.errors['required'],
        'is-valid': lastNameControl.errors && lastNameControl.errors['pattern']
      };
    }
    return {};
  }

  validatePhone() {
    const mobileControl = this.formGroup.get('mobile');
    if (mobileControl?.invalid && (mobileControl.dirty || mobileControl.touched)) {
      return {
        'is-invalid': mobileControl.errors && mobileControl.errors['required'],
        'is-valid': mobileControl.errors && mobileControl.errors['pattern']
      };
    }
    return {};
  }

  validateMail() {
    const mailIdControl = this.formGroup.get('mailId');
    if (mailIdControl?.invalid && (mailIdControl.dirty || mailIdControl.touched)) {
      return {
        'is-invalid': mailIdControl.errors && mailIdControl.errors['required'],
        'is-valid': mailIdControl.errors && mailIdControl.errors['email']
      };
    }
    return {};
  }

  validateSkype() {
    const skypeIdControl = this.formGroup.get('skypeId');
    if (skypeIdControl?.invalid && (skypeIdControl.dirty || skypeIdControl.touched)) {
      return {
        'is-invalid': skypeIdControl.errors && skypeIdControl.errors['required'],
        'is-valid': skypeIdControl.errors && skypeIdControl.errors['pattern']
      };
    }
    return {};
  }
}
