import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeDto } from '../../models/employee-Dto';
import { EmployeeService } from '../../services/employee.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [DecimalPipe, FormsModule, NgbTypeaheadModule,MatTooltipModule, NgbPaginationModule, MatIconModule, MatButtonModule,CommonModule,MatFormFieldModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss'
})
export class EmployeeDetailsComponent implements OnInit {

  canAddEmployee = true;
  page = 1;
  pageSize = 8;
  public collectionSize: number=0;
  employees: EmployeeDto[] = [];
  filteredEmployees: EmployeeDto[] = [];
  employee: EmployeeDto | undefined
  showEditIcon: { [key: string]: boolean } = {}; // Object to track if edit icon is shown for each employee
  showDeleteIcon: { [key: string]: boolean } = {}; // Object to track if delete icon is shown for each employee
  isKeyboardNavigation: boolean = false; // Flag to indicate if keyboard navigation is active
  searchQuery: string = '';


  constructor(private router: Router, private _employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this._employeeService.getEmployeesFromServer().subscribe({
      next: (res: EmployeeDto[]) => {
        this.employees = res;
        this.filterEmployees();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  filterEmployees() {
    const searchQuery = this.searchQuery.toLowerCase();
    this.filteredEmployees = this.employees.filter(employee =>
      employee.status === true &&
      (employee.firstName.toLowerCase().includes(searchQuery) || 
      employee.lastName.toLowerCase().includes(searchQuery) ||
      employee.identity.toLowerCase().includes(searchQuery) ||
      employee.startOfWorkDate.toString().toLowerCase().includes(searchQuery))
    );
    this.collectionSize = this.filteredEmployees.length;
  }

trackByEmployee(index: number, employee: EmployeeDto): string {
  return employee.identity;
}

  edit(identity:string){
    console.log("identity",identity)
    this.router.navigate(["editEmployee", identity]);
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
  showIcons(employee: EmployeeDto) {
    this.showEditIcon[employee.identity] = true;
    this.showDeleteIcon[employee.identity] = true;
  }

  hideIcons(employee: EmployeeDto) {
    this.showEditIcon[employee.identity] = false;
    this.showDeleteIcon[employee.identity] = false;
  }

  handleKeyboardNavigation(employee: EmployeeDto, event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.showIcons(employee);
    } else if (event.key === 'ArrowLeft') {
      this.hideIcons(employee);
    }
  }
  exportDataToExcel() {
        this.ToExcel(this.filteredEmployees);
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
}
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[scrollTracker]'
})
export class ScrollTrackerDirective {
  constructor(private el: ElementRef) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    const scrollTop = window.pageYOffset;

    if (windowHeight + scrollTop === documentHeight) {
      this.el.nativeElement.style.display = 'block';
    } else {
      this.el.nativeElement.style.display = 'none';
    }
  }
}
