import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeCardComponent } from './modules/employee/components/employee-card/employee-card.component';
import { EmployeeFormComponent } from './modules/employee/components/employee-form/employee-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'add', component: EmployeeFormComponent },
  { path: 'edit/:id', component: EmployeeFormComponent },
  { path: 'delete/:id', component: EmployeeFormComponent },
  { path: 'department/:department', component: EmployeeCardComponent },
  { path: 'offices/:office', component: EmployeeCardComponent },
  { path: 'jobTitles/:jobTitle', component: EmployeeCardComponent },
  {path: 'home', component: EmployeeCardComponent},
  {path: '**', redirectTo: 'home' }          //wildcard route
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
