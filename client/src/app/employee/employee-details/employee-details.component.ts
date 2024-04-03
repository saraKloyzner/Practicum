import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeDto } from '../employee-Dto';
import { EmployeeService } from '../employee.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [DecimalPipe, FormsModule, NgbTypeaheadModule, NgbPaginationModule, MatIconModule, MatButtonModule,CommonModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss'
})
export class EmployeeDetailsComponent implements OnInit {

  canAddEmployee = true;

  page = 1;
  pageSize = 4;
  public collectionSize!: number;
  employees: EmployeeDto[] = [];
  filteredEmployees: EmployeeDto[] = []; // New array to hold filtered employees
  employee: EmployeeDto | undefined
  constructor(private router: Router, private _employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }
  loadEmployees() {
    this._employeeService.getEmployeesFromServer().subscribe({
      next: (res) => {
        // this.employees = res;
        this.employees = res.filter(employee => employee.status === true); // Filter employees based on status

        // this.filteredEmployees = this.employees.filter(employee => employee.status === true); // Filter employees based on status
        this.collectionSize = this.employees.length;
        console.log(this.employees);
      },
      error: (err) => {
        console.log(err);

      }
    });
  }

  edit(identity:string){

  }
  addEmployee() {
    this.router.navigate(["addEmployee"]);
  }
  del(identity: string) {
    this._employeeService.deleteById(identity).subscribe({
      next:(res)=>{
        console.log(res)
        this.loadEmployees();
      },
      error:(err)=>
      {
        console.log(err)
      }
    })
    console.log(this.employees.find(employee => employee.identity !== identity)?.status === false)
  
    


  }

}

  // del(identity: string): void {
  //   // Update status locally instead of server
  //   this.employees = this.employees.filter(employee => employee.identity !== identity);
  // }

