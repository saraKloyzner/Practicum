import { Routes } from '@angular/router';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';

export const routes: Routes = [
    {path:'', redirectTo: 'allEmployees',pathMatch:'full'},
    {path :'allEmployees',loadComponent:()=>import('./employee/employee-details/employee-details.component').then(c=>c.EmployeeDetailsComponent)},
    {path :'addEmployee',loadComponent:()=>import('./employee/add-employee/add-employee.component').then(c=>c.AddEmployeeComponent)},
    {path: 'editEmployee/:identity', loadComponent:()=>import('./employee/edit-employee/edit-employee.component').then(c=>c.EditEmployeeComponent)},
    
    {path: '**', loadComponent:()=>import('./not-found/not-found.component').then(c=>c.NotFoundComponent)}

];

