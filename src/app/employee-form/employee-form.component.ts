import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee-services/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { NAME_PATTERN,EMAIL_PATTERN } from '../constants/constants';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})

export class EmployeeFormComponent {
  @Input() isFormVisible: boolean = false;                                    //form visibility
  @Input() employee: any;                                                     //sending emp data to card-cont comp
  @Output() addEmp: EventEmitter<any> = new EventEmitter<any>();              //emitting emp data in card comp
  @Output() hideFormEvent = new EventEmitter<void>();                        
  @Input() selectedEmployee: any = {};                                         //used to get selected emp details
  @Input() editMode: boolean = false;                                         
  @Output() updateEmp: EventEmitter<any> = new EventEmitter<any>();            //emitting updata in emp-card comp
  addClicked: boolean = false;                                                 //if user directly clicks on add btn in form
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
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

   getFormControlValue(controlName: string): any {                            //for getting values of form 
    const control = this.formGroup.get(controlName);
    return control ? control.value : null;
  }

  addEmployee(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.addClicked = true;
      return;
    }

    const firstname = this.getFormControlValue('firstname');
    const lastname = this.getFormControlValue('lastname');
    const designation = this.getFormControlValue('designation');
    const department = this.getFormControlValue('department');
    const mobile = this.getFormControlValue('mobile');
    const mailId = this.getFormControlValue('mailId');
    const location = this.getFormControlValue('location');
    const skypeId = this.getFormControlValue('skypeId');
    
    const employee = new Employee(                                      //fetching from model class 
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
