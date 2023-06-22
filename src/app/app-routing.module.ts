import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeCardComponent } from './employee-card/employee-card.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'add', component: EmployeeFormComponent },
  { path: 'edit/:id', component: EmployeeFormComponent },
  { path: 'delete/:id', component: EmployeeFormComponent },
  { path: 'department/:department', component: EmployeeCardComponent },
  { path: 'offices/:office', component: EmployeeCardComponent },
  { path: 'jobTitles/:jobTitle', component: EmployeeCardComponent },
  {path: 'home', component: EmployeeCardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
