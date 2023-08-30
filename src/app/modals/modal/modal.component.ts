import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { FormGroup } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent {
  selectedEmployee!: Employee;
  formGroup!: FormGroup
  employee!: Employee;

  constructor(public modal: NgbActiveModal, private employeeService: EmployeeService,private app: AppComponent) { }
  confirmDelete() {
    const delEmployee: Employee = this.formGroup.value;
    delEmployee.id = this.employee.id; 
    this.app.delete(delEmployee);
    this.modal.close();
  }

  cancelDelete() {
    this.modal.close();
  }
}
