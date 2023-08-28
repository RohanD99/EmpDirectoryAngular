import { Component, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

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
  addClicked: boolean = false;
  formGroup!: FormGroup;
  closeResult = '';
  modalRef!: NgbModalRef;
  isEditing: boolean = false;

  constructor(
    public modalService: NgbModal,
    private employeeService: EmployeeService,
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
  }

  isFieldInvalid(fieldName: string) {
    const control = this.formGroup.get(fieldName);
    return control?.invalid && (control?.touched || control?.dirty);
  }

  open(content: TemplateRef<any>) {
    const modalRef: NgbModalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

    modalRef.result.then(
      (result: any) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason: any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: string | ModalDismissReasons): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addEmployee(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.addClicked = true;
      return;
    }

    const newEmployee: Employee = {
      ...this.formGroup.value,
      id: this.employeeService.generateUniqueId(this.employee)
    };

    this.addEmp.emit(newEmployee);
    this.employeeService.addEmployee(newEmployee);
    this.formGroup.reset();
  }

  populateForm(employee: Employee) {
    this.employee = { ...employee };
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