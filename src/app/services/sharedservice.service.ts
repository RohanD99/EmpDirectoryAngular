import { Injectable } from '@angular/core';
import { EmployeeSelectedFilter } from '../models/employee';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private selectedFiltersSubject: BehaviorSubject<EmployeeSelectedFilter> = new BehaviorSubject<EmployeeSelectedFilter>(new EmployeeSelectedFilter());

  setSelectedFilters(selectedFilters: EmployeeSelectedFilter): void {
    this.selectedFiltersSubject.next(selectedFilters);
  }

  getSelectedFilters(): Observable<EmployeeSelectedFilter> {
    return this.selectedFiltersSubject.asObservable();
  }

  setSelectedFilterValue(filterType: string, filterValues: string[]): void {
    let currentFilters = this.selectedFiltersSubject.value;
    currentFilters[filterType] = filterValues;
    this.setSelectedFilters(currentFilters);
  }
}
