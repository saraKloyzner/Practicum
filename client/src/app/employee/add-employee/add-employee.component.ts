





import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/all-employee-details.module';
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
import { PositionService } from '../../services/position.service';
import { Position } from '../../models/position';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { EmployeePosition } from '../../models/employee-position.module';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


import { Router } from '@angular/router';
import { Observable, catchError, identity, map, of } from 'rxjs';
import { EmployeeDto } from '../../models/employee-Dto';






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
    MatTooltipModule,
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
  public allPositions: Position[] = [];
  showWorkDetails: boolean = false;
  private birthDate!: Date
  private startOfWorkDate!: Date
  durationInSeconds = 1.5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  allEmployees: EmployeeDto[] = []
  constructor(
    private router: Router,
    private _employeeService: EmployeeService,
    private _positionService: PositionService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    // this.returnAllEmployees()
    this.createForm();

  }

  ngOnInit(): void {

    this.returnAllPositions()
    console.log("----------allPosition--------", this.allPositions)
  }
  returnAllEmployees() {
    this._employeeService.getEmployeesFromServer().subscribe({
      next: (res) => {
        console.log(res);
        this.allEmployees = res;
        console.log("allEmployees", this.allEmployees)

      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  returnAllPositions() {
    this._positionService.getPositions().subscribe({
      next: (res) => {
        this.allPositions = res;
        console.log("allPositions", this.allPositions)

      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  private dateOfBirthVaidator: ValidatorFn = (control: AbstractControl): Promise<ValidationErrors | null> => {
    return new Promise((resolve) => {
      this.birthDate = control.value;
      const today: Date = new Date();
      const minAgeDate: Date = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());

      if (this.birthDate > today) {
        resolve({ 'worngBirthDate': true })
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
  validateIdentity(control: AbstractControl): ValidationErrors | null {
    const identityNumber: string = control.value;
    // בודק אם המזהה הוא מחרוזת ספרות בדיוק באורך של 9 תווים
    if (!/^\d{9}$/.test(identityNumber)) {
      return { 'invalidLength': true };
    }
    return null;
  }
  // ifExsistSameIdentity(control: AbstractControl): ValidationErrors | null {
  //   if (control.value === null)
  //     return null
  //   console.log("allEmployees",this.allEmployees)
  //   this.allEmployees?.forEach(element => {
  //     element.identity === control.value
  //     return { 'sameIdentities': true }
  //   });
  //   return null
  // }
  //  validateIdentitySame(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
  //   const identity = control.value;
  //   return this._employeeService.getEmployeeByIdentity(identity).pipe(
  //     map(employee => {
  //       return employee ? { validateIdentitySame: true } : null;
  //     }),
  //     catchError(() => {
  //       // אם יש שגיאה בביצוע הבדיקה, נחזיר null כדי שהערך יחשב כתקין
  //       return of(null);
  //     })
  //   );
  // }
  createForm(): void {
    this.addForm = this.fb.group({
      identity: ['', [Validators.required, this.validateIdentity]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      dateOfBirth: ['', Validators.required, this.dateOfBirthVaidator],
      startOfWorkDate: ['', Validators.required, this.startOfWorkValidator],
      maleOrFemale: [false, Validators.required],
      employeePositions: this.fb.array([]) // Initialize form array for employee positions
    });
    this.addPosition();

    const dateOfBirthControl = this.addForm.get('dateOfBirth');
    if (dateOfBirthControl) {
      dateOfBirthControl.valueChanges.subscribe(() => {
        this.addForm.get('startOfWorkDate')?.updateValueAndValidity(); // Trigger re-validation
      });
    }
    this.addForm.get('startOfWorkDate')?.valueChanges.subscribe(() => {

      const employeePositionsArray = this.addForm.get('employeePositions') as FormArray;
      employeePositionsArray.controls.forEach(control => {
        control.get('dateOfStartingWork')?.updateValueAndValidity();
      });
    });


  }
  get employeePositionsFormArray(): FormArray {
    return this.addForm.get('employeePositions') as FormArray;
  }



  addPosition(): void {
    const positionGroup = this.fb.group({
      positionId: ['', Validators.required], // שורה 57: הוספת Validators.required
      managerialPosition: ['', Validators.required],
      dateOfStartingWork: ['', Validators.required, this.dateOfStartPosition]
    });
    this.employeePositionsFormArray.push(positionGroup);

  }
  isAddPositionDisabled(): boolean {
    if (this.allPositions.length === 0)
      return true;
    else {
      console.log(this.allPositions)
      return this.employeePositionsFormArray.length >= this.allPositions.length;
    }
  }

  isAtLeastOnePositionRequired(): boolean {
    return this.employeePositionsFormArray.length ===1;
  }

  private dateOfStartPosition: ValidatorFn = (control: AbstractControl): Promise<ValidationErrors | null> => {

    return new Promise((resolve) => {

      //  this.birthDate = control.get('dateOfBirth')?.value;
      const dateOfStartingWork: Date = control.value;
      console.log("dateOfStartingWork", dateOfStartingWork)
      console.log("startOfWorkDate", this.startOfWorkDate)
      if (!this.startOfWorkDate) {
        console.log("null")
        resolve(null);
      }
      if (dateOfStartingWork < this.startOfWorkDate) {
        console.log("dateOfStartingWork < this.startOfWorkDate", dateOfStartingWork < this.startOfWorkDate)
        resolve({ 'beforStartTheWork': true });
      }
      else resolve(null);
    });
  };

  removePosition(index: number): void {
    this.employeePositionsFormArray.removeAt(index);
  }
  // formatDate(date: Date): string {
  //   return date.toISOString();
  // }

  formatDate(data: any): string {
    if (data instanceof Date) {
      return data.toISOString();
    } else if (data instanceof Object && data.hasOwnProperty('dateOfStartingWork')) {

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
      employeePositions: this.addForm.get('employeePositions')?.value.map((position: EmployeePosition) => ({
        ...position,
        managerialPosition: (position.managerialPosition),
        dateOfStartingWork: this.formatDate(position.dateOfStartingWork) // Call formatDate here
      })),
    };

    console.log("employee--------", employee);

    this._employeeService.addEmployee(employee).subscribe({
      next: (res) => {
        console.log(res);
        this.openSnackBar();

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
  filteredPositions(index: number): Position[] {
    if (!this.employeePositionsFormArray || !this.allPositions) {
      console.log("filter empty");
      console.log(this.allPositions);
      console.log(this.employeePositionsFormArray);

      return [];
    }
    const selectedPosition = this.employeePositionsFormArray.controls
      .filter((control, i) => i !== index) // סנן את התפקידים שאינם שווים לאינדקס שנמצא בפרמטר
      .map(positionGroup => positionGroup.get('positionId')?.value);
    return this.allPositions.filter(position => !selectedPosition.includes(position.id));
  }
  openSnackBar() {

    this._snackBar.open('The employee was successfully added', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,

    });
  }



}
