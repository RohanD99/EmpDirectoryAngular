import { Component, EventEmitter, Inject, Input, OnInit, Output, forwardRef } from '@angular/core';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent implements OnInit {
  @Input() employees: Employee[] = [];
  @Output() loadEmployeesEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.loadEmployeesEvent.emit();
  }

  
}
