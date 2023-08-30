import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from './modules/header/nav.module';
import { EmployeesModule } from './modules/employee/employees.module'; 
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modals/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
  ],
  
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HeaderModule,
    EmployeesModule,
    NgbModalModule
  ],
  bootstrap: [AppComponent],
  providers: [],
  exports: [],
})
export class AppModule {}
