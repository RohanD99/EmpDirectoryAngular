import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent {
  @Input() employee!: Employee;
  @Input() updatedEmployee!: Employee;
  isDeleteConfirmation: boolean = false;
  selectedEmployee!: Employee;
  @Output() updateEmp: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Output() employeeDeleted: EventEmitter<void> = new EventEmitter<void>();
  deleteModalRef!: NgbModalRef;
  @ViewChild('content') content!: EmployeeFormComponent;
  isEditing: boolean = false;

  constructor(private employeeService: EmployeeService, private router: Router, private modalService: NgbModal) { }

  deleteEmployee(employee: Employee) {
    this.isDeleteConfirmation = true;
    this.selectedEmployee = employee;
  }

  confirmDelete() {
    if (this.selectedEmployee) {
      this.employeeService.deleteEmployee(this.selectedEmployee.id);
      this.employeeDeleted.emit();
      this.isDeleteConfirmation = false;
      if (this.deleteModalRef) {
        this.deleteModalRef.close();
      }
    }
  }

  openDeleteConfirmationModal(content: any) {
    this.deleteModalRef = this.modalService.open(content);
  }

  updateEmployee(updatedEmployee: Employee) {
    this.employeeService.updateEmployee(updatedEmployee);
    this.updateEmp.emit(updatedEmployee);
  }

  cancelDelete() {
    this.isDeleteConfirmation = false;
    if (this.deleteModalRef) {
      this.deleteModalRef.dismiss();
    }
  }

  openEditModal(employee: Employee) {
    this.isEditing = true;
    this.selectedEmployee = { ...employee };
    const modalRef = this.modalService.open(this.content);
    modalRef.componentInstance.employee = employee;
  }
}
