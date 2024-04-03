import { Routes } from '@angular/router';




export const routes: Routes = [
    {path:'', redirectTo: 'allEmployees',pathMatch:'full'},
    {path :'allEmployees',loadComponent:()=>import('./employee/employee-details/employee-details.component').then(c=>c.EmployeeDetailsComponent)},
    {path :'addEmployee',loadComponent:()=>import('./employee/add-employee/add-employee.component').then(c=>c.AddEmployeeComponent)},
    {path: '**', loadComponent:()=>import('./not-found/not-found.component').then(c=>c.NotFoundComponent)}

];

