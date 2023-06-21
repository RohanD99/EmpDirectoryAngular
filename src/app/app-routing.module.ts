import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  { path: 'add', component: EmployeeFormComponent },
  { path: 'edit/:id', component: EmployeeFormComponent },
  { path: 'delete/:id', component: EmployeeFormComponent },
  { path: 'department', component: SidebarComponent },
  { path: 'offices', component: SidebarComponent },
  { path: 'jobTitles', component: SidebarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
