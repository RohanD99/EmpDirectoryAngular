import { Component, EventEmitter, Inject, Input, Output, forwardRef } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { ModalComponent } from 'src/app/modals/modal/modal.component';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})

export class EmployeeCardComponent {
  @Input() employee!: Employee;
  @Input() updatedEmployee!: Employee;
  @Output() updateEmp: EventEmitter<Employee> = new EventEmitter<Employee>();
  deleteModalRef!: NgbModalRef;
  isEditing: boolean = false;

  constructor(private modalService: NgbModal) { }

  openDeleteConfirmationModal() {
    this.deleteModalRef = this.modalService.open(ModalComponent);
  }

  updateEmployee(updatedEmployee: Employee) {
    this.updateEmp.emit(updatedEmployee);
  }

  openEditModal(employee: Employee) {
    this.employee = { ...employee };
    this.isEditing = true;
    let modalRef = this.modalService.open(EmployeeFormComponent);
    modalRef.componentInstance.employee = this.employee;
  }
}
