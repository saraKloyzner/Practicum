





import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/all-employee-details.module';
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
import { EmployeeRole } from '../models/employee-role.module';


import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


import { Router } from '@angular/router';






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
    MatExpansionModule,
    

  ]
})

export class AddEmployeeComponent implements OnInit {
  [x: string]: any;
  public addForm!: FormGroup;
  public allPositions!: RoleName[];
  showWorkDetails: boolean = false;
  private birthDate!: Date
  private startOfWorkDate!: Date
  durationInSeconds = 1.5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private router: Router,
    private _employeeService: EmployeeService,
    private _roleNameService: RoleNameService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
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






  // פונקציה זו מחזירה את רשימת התפקידים הזמינים לבחירה ללא תפקידים כפולים
  // availablePositions() {
    
  //   // רשימת התפקידים שלא נבחרו עדיין
  //   const selectedRoles = this.roleEmployeesFormArray.controls
  //     .map(roleGroup => roleGroup.get('roleNameId')?.value)
  //     .filter(roleNameId => roleNameId !== null && roleNameId !== undefined);
  //   console.log("selectedRoles", selectedRoles)
  //   // מסנן את כל התפקידים שלא נבחרו עדיין מהרשימה המקורית של כל התפקידים
  //   return this.allPositions.filter(position => !selectedRoles.includes(position.id));
  // }

  private minAgeValidator: ValidatorFn = (control: AbstractControl): Promise<ValidationErrors | null> => {
    return new Promise((resolve) => {
      this.birthDate = control.value;
      const today: Date = new Date();
      const minAgeDate: Date = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());

      if(this.birthDate>today) {
        resolve({'worngBirthDate':true})
      }
       else if (this.birthDate > minAgeDate) {
        resolve({ 'tooYoung': true });
        
      }
      else resolve(null)
    });
  };


  private startOfWorkValidator: ValidatorFn = (control: AbstractControl): Promise<ValidationErrors | null> => {

    return new Promise((resolve) => {
      this.startOfWorkDate = control.value;
      if (!this.birthDate || !this.startOfWorkDate) {
        console.log("null")
        resolve(null);
      }
      if (this.birthDate > this.startOfWorkDate)
      resolve({ 'tooEarlyToWork': true });
   
      const minAgeDate: Date = new Date(this.birthDate.getFullYear() + 16, this.birthDate.getMonth(), this.birthDate.getDate());
      console.log("minAgeDate", minAgeDate)
      if (this.startOfWorkDate < minAgeDate) {
        console.log("startOfWorkDate", this.startOfWorkDate, "minAgeDate", minAgeDate)
        resolve({ 'lessThan16Age': true });
      } else {
        resolve(null);

      }
    });
  };

  // private beforDateOfBirth: ValidatorFn = (control: AbstractControl): Promise<ValidationErrors | null> => {
  //   return new Promise((resolve) => {
  //     this.startOfWorkDate = control.value;
  //     if (!this.birthDate || !this.startOfWorkDate) {
  //       resolve(null);
  //     }
  //     if (this.birthDate < this.startOfWorkDate)
  //       resolve({ 'tooEarlyToWork': true });
  //     resolve(null);
  //   });
  // };


  validateIdentity(control: AbstractControl): ValidationErrors | null {
    const identityNumber: string = control.value;
    // בודק אם המזהה הוא מחרוזת ספרות בדיוק באורך של 9 תווים
    if (!/^\d{9}$/.test(identityNumber)) {
      return { 'invalidLength': true };
    }
    return null;
  }
  
  createForm(): void {
    this.addForm = this.fb.group({
      identity: ['', [Validators.required, this.validateIdentity]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      dateOfBirth: ['', Validators.required, this.minAgeValidator],
      startOfWorkDate: ['', Validators.required, this.startOfWorkValidator],
      maleOrFemale: [false, Validators.required],
      roleEmployees: this.fb.array([]) // Initialize form array for employee roles
    });
    this.addRole(); // Add initial role field

    const dateOfBirthControl = this.addForm.get('dateOfBirth');
    if (dateOfBirthControl) {
      dateOfBirthControl.valueChanges.subscribe(() => {
        this.addForm.get('startOfWorkDate')?.updateValueAndValidity(); // Trigger re-validation
      });
    }


    this.addForm.get('startOfWorkDate')?.valueChanges.subscribe(() => {
      // Trigger re-validation of the dateOfStartingWork field for each roleEmployee
      const roleEmployeesArray = this.addForm.get('roleEmployees') as FormArray;
      roleEmployeesArray.controls.forEach(control => {
        control.get('dateOfStartingWork')?.updateValueAndValidity();
      });
    });
    // const startOfWorkDateControl = this.addForm.get('startOfWorkDate');
   
    // if (startOfWorkDateControl) {
    //   console.log("startOfWorkDate update")
    //   startOfWorkDateControl.valueChanges.subscribe(() => {
    //     this.addForm.get('roleEmployees')?.updateValueAndValidity(); // Trigger re-validation
    //   });
    // }
  
  }



  get roleEmployeesFormArray(): FormArray {
    return this.addForm.get('roleEmployees') as FormArray;
  }



  addRole(): void {
    const roleGroup = this.fb.group({
      roleNameId: ['', Validators.required], // שורה 57: הוספת Validators.required
      managerialPosition: ['', Validators.required],
      dateOfStartingWork: ['', Validators.required, this.dateOfStartPosition]
    });
    this.roleEmployeesFormArray.push(roleGroup);
    
  }

  private dateOfStartPosition: ValidatorFn = (control: AbstractControl): Promise<ValidationErrors | null> => {

    return new Promise((resolve) => {

      //  this.birthDate = control.get('dateOfBirth')?.value;
      const dateOfStartingWork: Date = control.value;
      console.log("dateOfStartingWork", dateOfStartingWork)
      console.log("startOfWorkDate", this.startOfWorkDate)
      if ( !this.startOfWorkDate) {
        console.log("null")
        resolve(null);
      }
      if (dateOfStartingWork< this.startOfWorkDate){
      console.log("dateOfStartingWork < this.startOfWorkDate",dateOfStartingWork< this.startOfWorkDate)
        resolve({ 'beforStartTheWork': true });
      }
      else resolve(null);
    });
  };

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
        this.openSnackBar()
        this.router.navigate(["allEmployees"]);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  proceedToNextStep() {
    // if (this.addForm.invalid) {
    //   console.log("form not valid")
    //   return ;
    // }

    this.showWorkDetails = true;
    console.log("form valid")
    // // גלול לתחתית הדף
    // window.scrollTo({
    //   top: document.body.scrollHeight,
    //   behavior: 'smooth'
    // });
  }
  filteredPositions(index: number): RoleName[] {
    if (!this.roleEmployeesFormArray||!this.allPositions) {
      return [];
    }
    const selectedRoles = this.roleEmployeesFormArray.controls
      .filter((control, i) => i !== index) // סנן את התפקידים שאינם שווים לאינדקס שנמצא בפרמטר
      .map(roleGroup => roleGroup.get('roleNameId')?.value);
    return this.allPositions.filter(position => !selectedRoles.includes(position.id));
  }
  openSnackBar() {
    
    this._snackBar.open('The employee added succssid', '' ,{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      
    });
  }

 

}
