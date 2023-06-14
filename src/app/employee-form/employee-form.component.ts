import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  @Output() addEmp: EventEmitter<any> = new EventEmitter<any>();
  @Output() hideFormEvent = new EventEmitter<void>();
  editMode: boolean = false;

  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,private employeeService: EmployeeService) {
    
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
      skypeId: ['', Validators.required]
    });
  }

  closeForm() {
    this.hideFormEvent.emit();
  }

  addEmployee(): void {
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
    this.closeForm();
  }
}
