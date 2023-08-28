import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { localStorageKey } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  private allEmployees: any[] = [];

  constructor() {
    this.allEmployees = this.initiate();
   }

  generateUniqueId(employee: Employee): number {
    const currentTimestamp = new Date().getTime();
    const maxId = employee && employee.id ? employee.id : 0;
    const uniqueId = Math.max(maxId + 1, currentTimestamp);
    return uniqueId;
  }

  loadEmployeesFromLocalStorage() {
    const employeesFromLocalStorage = localStorage.getItem(localStorageKey);
    let result: any;
    if (employeesFromLocalStorage) {
      result = JSON.parse(employeesFromLocalStorage);
    }
    return result;
  }

  getEmployeesFromLocalStorage(): any[] {
    const employeesJson = localStorage.getItem(localStorageKey);
    return employeesJson ? JSON.parse(employeesJson) : [];
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

  deleteEmployee(employeeId: number): void {
    const index = this.allEmployees.findIndex((employee: Employee) => employee.id === employeeId);
    if (index !== -1) {
      this.allEmployees.splice(index, 1);
      this.saveEmployeesToLocalStorage(this.allEmployees);
    }
  }  
}

