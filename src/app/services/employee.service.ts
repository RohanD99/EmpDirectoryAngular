import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeFormComponent } from '../modules/employee/components/employee-form/employee-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { localStorageKey } from '../constants/constants';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  private allEmployees: any[] = [];

  constructor(private modalService: NgbModal) {
    this.allEmployees = this.initiate();
   }

  openEmployeeFormModal() {
    const modalRef = this.modalService.open(EmployeeFormComponent, { size: 'lg' });
    return modalRef;
  }

  closeEmployeeFormModal(modalRef: NgbModalRef) {
  modalRef.close();
}
  

  generateUniqueId(employee: any): number {
    const currentTimestamp = new Date().getTime();
    const maxId = employee && employee.id ? employee.id : 0;
    const uniqueId = Math.max(maxId + 1, currentTimestamp);
    return uniqueId;
  }

  loadEmployeesFromLocalStorage() {
    const employeesFromLocalStorage = localStorage.getItem('employees');
    let result: any;
    if (employeesFromLocalStorage) {
      result = JSON.parse(employeesFromLocalStorage);
    }
    return result;
  }

  initiate(): Employee[] {
    const employeesJson = localStorage.getItem(localStorageKey);
    return employeesJson ? JSON.parse(employeesJson) : [];
  }

  private saveEmployeesToLocalStorage(employees: any[]): void {
    const employeesJson = JSON.stringify(employees);
    localStorage.setItem(localStorageKey, employeesJson);
  }

  addEmployee(employee: any): void {
    const newEmployee = { ...employee, id: this.generateUniqueId(employee) };
    newEmployee.preferredName = `${newEmployee.firstname} ${newEmployee.lastname}`; 
    this.allEmployees.push(newEmployee);
    this.saveEmployeesToLocalStorage(this.allEmployees);
  }
  
  updateEmployee(updatedEmployee: any): void {
    const index = this.allEmployees.findIndex((employee: any) => employee.id === updatedEmployee.id);
    if (index !== -1) {
      this.allEmployees[index] = updatedEmployee;
      this.saveEmployeesToLocalStorage(this.allEmployees);   
    }
  }

  deleteEmployee(employeeId: Employee): void {
    const index = this.allEmployees.findIndex((employee: any) => employee.id === employeeId);
    if (index !== -1) {
      this.allEmployees.splice(index, 1);
      this.saveEmployeesToLocalStorage(this.allEmployees);
    }
  }
}

