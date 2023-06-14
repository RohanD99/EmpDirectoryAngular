import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  private readonly localStorageKey = 'employees';

  private departmentCounts: BehaviorSubject<any> = new BehaviorSubject<any>({});
  departmentCounts$ = this.departmentCounts.asObservable();

  private designationCounts: BehaviorSubject<any> = new BehaviorSubject<any>({});
  designationCounts$ = this.designationCounts.asObservable();

  private locationCounts: BehaviorSubject<any> = new BehaviorSubject<any>({});
  locationCounts$ = this.locationCounts.asObservable();

  constructor() { }

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
    this.updateCount('departments', this.departmentCounts);
    this.updateCount('jobTitles', this.designationCounts);
    this.updateCount('offices',this.locationCounts);
  }

  updateEmployee(updatedEmployee: any): void {
    const employees = this.getEmployeesFromLocalStorage();
    const index = employees.findIndex((employee: any) => employee.id === updatedEmployee.id);
    if (index !== -1) {
      employees[index] = updatedEmployee;
      this.saveEmployees(employees);
    }
  }

  deleteEmployee(employeeId: number): void {
    let employees = this.getEmployeesFromLocalStorage();
    employees = employees.filter((employee: any) => employee.id !== employeeId);
    this.saveEmployees(employees);
  }

  saveEmployees(employees: any[]): void {
    const employeesJson = JSON.stringify(employees);
    localStorage.setItem(this.localStorageKey, employeesJson);
  } 

  updateCount(elementId: string, countSubject: BehaviorSubject<any>): void {
    const counts = countSubject.getValue();
    const currentCount = counts[elementId] || 0;
    const updatedCounts = { ...counts, [elementId]: `(${currentCount + 1})` };
    countSubject.next(updatedCounts);
  }
}
