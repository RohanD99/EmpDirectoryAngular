import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  private readonly localStorageKey = 'employees';
  setSelectedEmployee: any;

  private departmentCounts: BehaviorSubject<any> = new BehaviorSubject<any>({});
  departmentCounts$ = this.departmentCounts.asObservable();

  private designationCounts: BehaviorSubject<any> = new BehaviorSubject<any>({});
  designationCounts$ = this.designationCounts.asObservable();

  private locationCounts: BehaviorSubject<any> = new BehaviorSubject<any>({});
  locationCounts$ = this.locationCounts.asObservable();

  constructor() {}

  generateUniqueId(): number {
    const employees = this.getEmployeesFromLocalStorage();
    let maxId = 0;

    if (employees) {
      for (const employee of employees) {
        if (employee.id > maxId) {
          maxId = employee.id;
        }
      }
    }
    return maxId + 1;
  }

  getEmployeesFromLocalStorage(): any[] {
    const employeesJson = localStorage.getItem(this.localStorageKey);
    return employeesJson ? JSON.parse(employeesJson) : [];
  }

  addEmployee(employee: any): void {
    const employees = this.getEmployeesFromLocalStorage();
    employee.id = this.generateUniqueId();
    employees.push(employee);
    this.saveEmployees(employees);
    this.updateCounts();
  }

  updateEmployee(updatedEmployee: any): void {
    const employees = this.getEmployeesFromLocalStorage();
    const index = employees.findIndex((employee: any) => employee.id === updatedEmployee.id);
    if (index !== -1) {
      employees[index] = updatedEmployee;
      this.saveEmployees(employees);
      this.updateCounts();
    }
  }

  deleteEmployee(employeeId: number): void {
    let employees = this.getEmployeesFromLocalStorage();
    employees = employees.filter((employee: any) => employee.id !== employeeId);
    this.saveEmployees(employees);
    this.updateCounts();
  }
  
  saveEmployees(employees: any[]): void {
    const employeesJson = JSON.stringify(employees);
    localStorage.setItem(this.localStorageKey, employeesJson);
  }
  
  updateCounts(): void {
    const employees = this.getEmployeesFromLocalStorage();
    const departmentCounts: Record<string, number> = {};
    const designationCounts: Record<string, number> = {};
    const locationCounts: Record<string, number> = {};
  
    employees.forEach((employee: any) => {
      const department = employee.department;
      const designation = employee.designation;
      const location = employee.location;
  
      departmentCounts[department] = (departmentCounts[department] || 0) + 1;
      designationCounts[designation] = (designationCounts[designation] || 0) + 1;
      locationCounts[location] = (locationCounts[location] || 0) + 1;
    });
  

    this.departmentCounts.next(departmentCounts);
    this.designationCounts.next(designationCounts);
    this.locationCounts.next(locationCounts);
  }


}
