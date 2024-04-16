
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/all-employee-details.module';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Position } from '../../models/position';
import { EmployeePosition } from '../../models/employee-position.module';
import { Functions } from '../functions-add-edit';
import { snackBar } from '../../snack-bar';
import { Router } from '@angular/router';
import { EmployeeDto } from '../../models/employee-Dto';
@Component({
  selector: 'app-add-employee',
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})

export class AddEmployeeComponent implements OnInit {
  [x: string]: any;
  public addForm!: FormGroup;
  showWorkDetails: boolean = false;
  private birthDate!: Date
  private startOfWorkDate!: Date
  allEmployees: EmployeeDto[] = []
  constructor(
    private router: Router,
    private _employeeService: EmployeeService,
    private fb: FormBuilder,
    private _snack: snackBar,
    private _function:Functions
  ) {
    this.createForm();
  }
  ngOnInit(): void {

    this._function.returnAllPositions()
    console.log("----------allPosition--------", this._function.allPositions)
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
  createForm(): void {
    // const myValidator = new Functions();
    this.addForm = this.fb.group({
      identity: ['', [Validators.required, this._function.validateIdentity]],
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
    if (this._function.allPositions.length === 0)
      return true;
    else {
      console.log(this._function.allPositions)
      return this.employeePositionsFormArray.length >= this._function.allPositions.length;
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
        this._snack.openSnackBar('The employee was successfully added');

        this.router.navigate(["employee/allEmployees"]);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

 
  filteredPositions(index: number): Position[] {
    if (!this.employeePositionsFormArray || !this._function.allPositions) {
      console.log("filter empty");
      console.log(this._function.allPositions);
      console.log(this.employeePositionsFormArray);

      return [];
    }
    const selectedPosition = this.employeePositionsFormArray.controls
      .filter((control, i) => i !== index) // סנן את התפקידים שאינם שווים לאינדקס שנמצא בפרמטר
      .map(positionGroup => positionGroup.get('positionId')?.value);
    return this._function.allPositions.filter(position => !selectedPosition.includes(position.id));
  }
}
