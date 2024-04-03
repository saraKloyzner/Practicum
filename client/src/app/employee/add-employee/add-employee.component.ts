





import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../all-employee-details.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { RoleNameService } from '../../role-name.service';
import { RoleName } from '../../role-name';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { EmployeeRole } from '../employee-role.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';



@Component({
  selector: 'app-add-employee',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatDatepicker,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    MatCardModule,
    // BrowserAnimationsModule,
    // MatNativeDateModule,
    MatExpansionModule
  ]
})
export class AddEmployeeComponent implements OnInit {
  public addForm!: FormGroup;
  public allPositions!: RoleName[];

  constructor(
    private _employeeService: EmployeeService,
    private _roleNameService: RoleNameService,
    private fb: FormBuilder
  ) { this.createForm(); }

  ngOnInit(): void {
    this.returnAllRolesName()
  }
  returnAllRolesName() {
    this._roleNameService.getRolesName().subscribe({
      next: (res) => {
        this.allPositions = res;
        console.log("allPositions", this.allPositions)
        // this.createForm();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  createForm(): void {
    this.addForm = this.fb.group({
      identity: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      dateOfBirth: ['', Validators.required],
      startOfWorkDate: ['', Validators.required],
      maleOrFemale: [false, Validators.required],
      roleEmployees: this.fb.array([]) // Initialize form array for employee roles
    });
    this.addRole(); // Add initial role field
  }



  get roleEmployeesFormArray(): FormArray {
    return this.addForm.get('roleEmployees') as FormArray;
  }



  addRole(): void {
    const roleGroup = this.fb.group({
      roleNameId: ['', Validators.required], // שורה 57: הוספת Validators.required
      managerialPosition: ['', Validators.required],
      dateOfStartingWork: ['', Validators.required]
    });
    this.roleEmployeesFormArray.push(roleGroup);
  }



  removeRole(index: number): void {
    this.roleEmployeesFormArray.removeAt(index);
  }
  // formatDate(date: Date): string {
  //   return date.toISOString();
  // }

  formatDate(data: any): string {
    if (data instanceof Date) {
      return data.toISOString();
    } else if (data instanceof Object && data.hasOwnProperty('dateOfStartingWork')) {
      // Assuming 'dateOfStartingWork' is a property within data (EmployeeRole)
      return new Date(data.dateOfStartingWork).toISOString();
    }
    // Handle other data types if needed
    return '';
  }


  onSubmit(): void {
    if (this.addForm.invalid) {
      return;
    }

    const employee: Employee = {
      identity: this.addForm.get('identity')?.value,
      firstName: this.addForm.get('firstName')?.value,
      lastName: this.addForm.get('lastName')?.value,
      dateOfBirth: this.formatDate(this.addForm.get('dateOfBirth')?.value),
      startOfWorkDate: this.formatDate(this.addForm.get('startOfWorkDate')?.value),
      maleOrFemale: this.addForm.get('maleOrFemale')!.value === 'true',
      status: true,
      roleEmployees: this.addForm.get('roleEmployees')?.value.map((role: EmployeeRole) => ({
        ...role,
        managerialPosition: Boolean(role.managerialPosition),
        dateOfStartingWork: this.formatDate(role.dateOfStartingWork) // Call formatDate here
      })),
    };

    console.log("employee", employee);

    this._employeeService.addEmployee(employee).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
