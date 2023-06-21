import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly localStorageKey = 'employees';
  private allEmployees: any[] = [];

  private employeesSubject = new BehaviorSubject<any[]>([]);
  public employees$ = this.employeesSubject.asObservable();

  private departmentCounts: BehaviorSubject<any> = new BehaviorSubject<any>({});
  departmentCounts$ = this.departmentCounts.asObservable();

  private designationCounts: BehaviorSubject<any> = new BehaviorSubject<any>({});
  designationCounts$ = this.designationCounts.asObservable();

  private locationCounts: BehaviorSubject<any> = new BehaviorSubject<any>({});
  locationCounts$ = this.locationCounts.asObservable();

  constructor() {
    this.allEmployees = this.getEmployeesFromLocalStorage();
    this.updateCounts();
  }

  

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


  private saveEmployeesToLocalStorage(employees: any[]): void {
    const employeesJson = JSON.stringify(employees);
    localStorage.setItem(this.localStorageKey, employeesJson);
  }



  private emitEmployees(): void {
    this.employeesSubject.next(this.allEmployees);
  }

  addEmployee(employee: any): void {
    employee.id = this.generateUniqueId();
    this.allEmployees.push(employee);
    this.saveEmployeesToLocalStorage(this.allEmployees);
    this.updateCounts();
    this.emitEmployees();
  }

  updateEmployee(updatedEmployee: any): void {
    const index = this.allEmployees.findIndex((employee: any) => employee.id === updatedEmployee.id);
    if (index !== -1) {
      this.allEmployees[index] = updatedEmployee;
      this.saveEmployeesToLocalStorage(this.allEmployees);
      this.updateCounts();
      this.emitEmployees();
    }
  }

  deleteEmployee(employeeId: number): void {
    const index = this.allEmployees.findIndex((employee: any) => employee.id === employeeId);
    if (index !== -1) {
      this.allEmployees.splice(index, 1);
      this.saveEmployeesToLocalStorage(this.allEmployees);
      this.updateCounts();
      this.emitEmployees();
    }
  }

  updateCounts(): void {
    const departmentCounts: Record<string, number> = {};
    const designationCounts: Record<string, number> = {};
    const locationCounts: Record<string, number> = {};

    this.allEmployees.forEach((employee: any) => {
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
  
  updateEmployees(employees: any[]): void {
    this.employeesSubject.next(employees);
  }

}
