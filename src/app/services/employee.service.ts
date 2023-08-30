import { Injectable } from '@angular/core';
import { LocalStorageKey } from '../constants/constants';
import { Employee } from '../models/employee';
import { Utility } from '../common/utility.service';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private utility: Utility) { }

  getAll(): Array<Employee> {
    let empData = localStorage.getItem(LocalStorageKey);
    let employees = !!empData ? JSON.parse(empData) : undefined;
    return !!employees && !!employees.length ? employees.map((employee: any) => new Employee(employee)) : [];
  }

  save(employee: Employee): void {
    let employees: Array<Employee> = this.getAll();
    if (!!employee) {
      if (!!employee.id) {
        let index = employees.findIndex((emp: Employee) => emp.id == employee.id);
        if (index > -1) {
          employees[index] = employee;
        }
      } else {
        employee.id = this.utility.generateUniqueId(employee);
        employees.push(employee);
      }

      localStorage.setItem(LocalStorageKey, JSON.stringify(employees));
    }
  }

  deleteEmployee(employeeId: number): void {
    let employees: Array<Employee> = this.getAll();
    const index = employees.findIndex((employee: Employee) => employee.id === employeeId);
    if (index !== -1) {
      employees.splice(index, 1);
      localStorage.setItem(LocalStorageKey, JSON.stringify(employees));
    }
  }
}

