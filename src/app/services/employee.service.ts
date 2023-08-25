import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeFormComponent } from '../modules/employee/components/employee-form/employee-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  private readonly localStorageKey = 'employees';

  constructor(private modalService: NgbModal) { }

  openEmployeeFormModal() {
    const modalRef = this.modalService.open(EmployeeFormComponent, { size: 'lg' });
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
    const employeesJson = localStorage.getItem(this.localStorageKey);
    return employeesJson ? JSON.parse(employeesJson) : [];
  }

  private saveEmployeesToLocalStorage(employees: any[]): void {
    const employeesJson = JSON.stringify(employees);
    localStorage.setItem(this.localStorageKey, employeesJson);
  }

  // private emitEmployees(): void {
  //   this.employeesSubject.next(this.allEmployees);
  // }

  addEmployee(employee: Employee): void {
    const newEmployee = { ...employee, id: this.generateUniqueId(employee) };
    newEmployee.preferredName = `${newEmployee.firstname} ${newEmployee.lastname}`;
    // this.allEmployees.push(newEmployee);
    // this.saveEmployeesToLocalStorage(this.allEmployees);
    // this.updateCounts();
    // this.emitEmployees();
  }

  updateEmployee(updatedEmployee: Employee): void {
    // const index = this.allEmployees.findIndex((employee: any) => employee.id === updatedEmployee.id);
    // if (index !== -1) {
    //   this.allEmployees[index] = updatedEmployee;
    //   this.saveEmployeesToLocalStorage(this.allEmployees);
    //   this.updateCounts();
    //   this.emitEmployees();
    }
  }

  // deleteEmployee(employee: Employee): void {
  //   const index = this.allEmployees.findIndex((emp: any) => emp.id === employee.id);
  //   if (index !== -1) {
  //     this.allEmployees.splice(index, 1);
  //     this.saveEmployeesToLocalStorage(this.allEmployees);
  //     this.updateCounts();
  //     this.emitEmployees();
  //   }
  

  // updateCounts(): void {
  //   const employees = this.initiate();
  //   const departmentCounts: Record<string, number> = {};
  //   const designationCounts: Record<string, number> = {};
  //   const locationCounts: Record<string, number> = {};

  //   employees.forEach((employee: any) => {
  //     const department = employee.department;
  //     const designation = employee.designation;
  //     const location = employee.location;

  //     departmentCounts[department] = (departmentCounts[department] || 0) + 1;
  //     designationCounts[designation] = (designationCounts[designation] || 0) + 1;
  //     locationCounts[location] = (locationCounts[location] || 0) + 1;
  //   });

  //   this.departmentCounts.next(departmentCounts);
  //   this.designationCounts.next(designationCounts);
  //   this.locationCounts.next(locationCounts);
  // }

  // updateEmployees(employees: any[]): void {
  //   this.employeesSubject.next(employees);
  // }
