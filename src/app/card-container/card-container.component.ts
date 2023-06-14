import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent {
@Input() employees: any[] = [];

isFormVisible: boolean = false;

constructor(private router: Router) {
  
}

showForm(){
  this.isFormVisible=false;
}

addEmployee(employee: any): void {
  this.employees.push(employee);
}
}
