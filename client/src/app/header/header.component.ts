import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

import { EmployeeService } from '../services/employee.service';
import * as XLSX from 'xlsx';
import { EmployeeDto } from '../models/employee-Dto';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule,MatButtonModule,MatIconModule,MatTooltipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private _employeeService:EmployeeService,private router: Router){}
  exportDataToExcel() {
    this._employeeService.getEmployeesFromServer().subscribe({
      next: (res) => {
        this.ToExcel(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
    
  }
  ToExcel(data: EmployeeDto[]): void {
    this.exportToExcel(data, 'employees_data');
  }
  private exportToExcel(data: EmployeeDto[], filename: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${filename}.xlsx`);
  }
  addEmployee(){
    this.router.navigate(["addEmployee"]);
  }
  allEmployees(){
    this.router.navigate(["allEmployees"]);
  }
  addPosition(){
    this.router.navigate(['addPosition']);
  }
  login(){
    this.router.navigate(["login"])
  }
  logout(){
    this.router.navigate(['logout'])
  }
}
