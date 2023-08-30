import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeSelectedFilter } from 'src/app/models/employee';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeFormComponent } from 'src/app/modules/employee/components/employee-form/employee-form.component';
import { Utility } from 'src/app/common/utility.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  @Input() selectedFilters: EmployeeSelectedFilter = new EmployeeSelectedFilter();   
  @Output() searchEvent: EventEmitter<{ searchValue: string, filterBy: string }> = new EventEmitter<{ searchValue: string, filterBy: string }>();
  @Output() characterSelectEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() showAllEmployeesEvent: EventEmitter<void> = new EventEmitter<void>();
  
  constructor(private modalService: NgbModal,private utility: Utility) {
    this.selectedFilters.characters = this.utility.generateAlphabets();
  }

  openEmployeeForm(): void {
    this.modalService.open(EmployeeFormComponent);
  }

  showAllEmployees(): void {
    this.showAllEmployeesEvent.emit();
  }

  onClearAll(): void {
    this.selectedFilters.searchValue = '';
    this.showAllEmployees()
  }

  selectCharacter(character: string): void {
    if (this.selectedFilters.selectedCharacter === character) {
      return;
    }
    this.characterSelectEvent.emit(character); 
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    const searchValue = target.value.trim().toLowerCase();
    const filterBy = (document.getElementById('filterBy') as HTMLSelectElement).value;
    this.searchEvent.emit({ searchValue, filterBy }); 
  }
}
