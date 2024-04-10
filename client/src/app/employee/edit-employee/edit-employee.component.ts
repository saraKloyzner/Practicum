import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../models/all-employee-details.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Position } from '../../models/position';
import { EmployeePosition } from '../../models/employee-position.module';
import { PositionService } from '../../services/position.service';
import { ValidatorFn } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';


export class MyValidator {
  private birthDate!:Date
  private startOfWorkDate!:Date;
  private dateOfStartingWork!:Date;
  public dateOfBirthVaidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
       this.birthDate = control.value;
      const today: Date = new Date();
      const minAgeDate: Date = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());

      if (this.birthDate > today) {
        return { 'worngBirthDate': true };
      } else if (this.birthDate > minAgeDate) {
        return { 'tooYoung': true };
      }

      return null;
    };
  }
  public startOfWorkValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
       this.startOfWorkDate = control.value;
      if (!this.birthDate || !this.startOfWorkDate) {
        console.log("null")
        return (null);
      }
      if (this.birthDate > this.startOfWorkDate)
        return({ 'tooEarlyToWork': true });
      const minAgeDate: Date = new Date(this.birthDate.getFullYear() + 16, this.birthDate.getMonth(), this.birthDate.getDate());

      if (this.startOfWorkDate < minAgeDate) {
        console.log("startOfWorkDate", this.startOfWorkDate, "minAgeDate", minAgeDate)
        return({ 'lessThan16Age': true });
      } else {
        return(null);

      }
    }
  }

   dateOfStartPosition(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      this.dateOfStartingWork = control.value;
      if (!this.startOfWorkDate) {
        return null;
      }
      if (this.dateOfStartingWork < this.startOfWorkDate) {
        return { 'beforStartTheWork': true };
      } else {
        return null;
      }
    };
  }
  
  
}



@Component({
  selector: 'app-edit-employee',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatRadioModule,
    MatButtonModule,
    MatFormFieldModule,
    CommonModule,
    MatCardModule, FormsModule,
    ReactiveFormsModule,
    MatDatepicker,MatTooltipModule
  ],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent implements OnInit {
  identity!: number
  employee!: Employee
  editForm!: FormGroup;
  public allPositions!: Position[];
  @Input() availablePositions: Position[] = [];
  @Input() employeePositions: EmployeePosition[] = [];
  showWorkDetails: boolean = false;
  private birthDate!: Date
  private startOfWorkDate!: Date
  durationInSeconds = 1.5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  editPositionForm!: FormGroup;
  position: number = 0;


  constructor(
    private router: Router,
    private _employeeService: EmployeeService,
    private route: ActivatedRoute,
    private _positionService: PositionService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,) { }
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.identity = params['identity'] as number;
        console.log(this.identity);
      });
  
    this.returnAllPositions()
    this.loadEmployee();

    // this.initForm();
  }

  returnAllPositions() {
    this._positionService.getPositions().subscribe({
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
  validateIdentity(control: AbstractControl): ValidationErrors | null {
    const identityNumber: string = control.value;
    // בודק אם המזהה הוא מחרוזת ספרות בדיוק באורך של 9 תווים
    if (!/^\d{9}$/.test(identityNumber)) {
      return { 'invalidLength': true };
    }
    return null;
  }
  onDateOfBirthChange(): void {
    this.editForm.get('dateOfBirth')?.updateValueAndValidity();
  }

  initForm(): void {
    const myValidator = new MyValidator();
    this.editForm = this.fb.group({
      identity: [this.employee.identity, [Validators.required, this.validateIdentity]],
      firstName: [this.employee.firstName, [Validators.required, Validators.minLength(3)]],
      lastName: [this.employee.lastName, [Validators.required, Validators.minLength(3)]],
      dateOfBirth: [new Date(this.employee.dateOfBirth), [Validators.required,  myValidator.dateOfBirthVaidator()]],
      startOfWorkDate: [new Date(this.employee.startOfWorkDate), [Validators.required, myValidator.startOfWorkValidator()]],
      //dateOfBirth: [new Date(this.employee.dateOfBirth), [Validators.required]],
      //startOfWorkDate: [new Date(this.employee.startOfWorkDate), [Validators.required]],

      maleOrFemale: [this.employee.maleOrFemale.toString(), Validators.required],
      employeePositions: this.fb.array([]) // Initialize form array for employee positions
    });
    console.log("editForm", this.editForm)
    // Populate the positions form array with the employee's positions
    this.employee.employeePositions.forEach(position => {
      console.log("positionDatails", position)
      this.addPosition(position);
    });
    // this.editForm.get('dateOfBirth')?.updateValueAndValidity();
    const dateOfBirthControl = this.editForm.get('dateOfBirth');
    if (dateOfBirthControl) {
      dateOfBirthControl.valueChanges.subscribe(() => {
        this.editForm.get('startOfWorkDate')?.updateValueAndValidity(); // Trigger re-validation
      });
    }
    // this.editForm.get('startOfWorkDate')?.valueChanges.subscribe(() => {

    //   const employeePositionsArray = this.editForm.get('employeePositions') as FormArray;
    //   employeePositionsArray.controls.forEach(control => {
    //     control.get('dateOfStartingWork')?.updateValueAndValidity();
    //   });
    // });
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

  editAddPosition(): void {
    const positionGroup = this.fb.group({
      positionId: ['', Validators.required], 
      managerialPosition: ['', Validators.required],
      dateOfStartingWork: ['', Validators.required]
    });
    this.employeePositionsFormArray.push(positionGroup);
  }
  


  addPosition(position: EmployeePosition): void {
    // const valid=new MyValidator()
    console.log("position", position)
    this.employeePositionsFormArray.push(this.fb.group({
      positionId: [position.positionId, Validators.required],
      managerialPosition: [position ? position.managerialPosition : false, Validators.required],
      //dateOfStartingWork: [position ? new Date(position.dateOfStartingWork) : '', Validators.required, valid.dateOfStartPosition()]
      dateOfStartingWork: [position ? new Date(position.dateOfStartingWork) : '', Validators.required]

    }));
  }
  dateOfStartPosition(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

  

      //  this.birthDate = control.get('dateOfBirth')?.value;
      const dateOfStartingWork: Date = control.value;
      console.log("dateOfStartingWork", dateOfStartingWork)
      console.log("startOfWorkDate", this.startOfWorkDate)
      if (!this.startOfWorkDate) {
        console.log("null")
        return(null);
      }
      if (dateOfStartingWork < this.startOfWorkDate) {
        console.log("dateOfStartingWork < this.startOfWorkDate", dateOfStartingWork < this.startOfWorkDate)
        return({ 'beforStartTheWork': true });
      }
      else return(null);
    
  }
}
  getNameOfPosition(positionId: number): any {
    console.log("positionId", positionId)
    for (let po of this.allPositions)
      if (po.id === positionId) {
        console.log("po.Name", po.name)
        return po.name

      }
    console.log("error")
  }
  get positionsFormArray(): FormArray {
    return this.editPositionForm.get('roles') as FormArray;
  }

  removePosition(index: number): void {
    // this.PositionsFormArray.removeAt(index);
    this.employeePositionsFormArray.removeAt(index)
  }


  loadEmployee(): void {
    this._employeeService.getEmployeeByIdentity(this.identity.toString()).subscribe({
      next: (res) => {
        console.log("employee", res);
        this.employee = res;
        this.initForm();
        // this.createForm();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  private positions!: FormArray
  get employeePositionsFormArray(): FormArray {
    this.positions = this.editForm.get('employeePositions') as FormArray;
    console.log("positions", this.positions)
    return this.positions;
  }

  filteredPositions(index: number): Position[] {
    if (!this.employeePositionsFormArray || !this.allPositions) {
      return [];
    }
    const selectedposition = this.employeePositionsFormArray.controls
      .filter((control, i) => i !== index) // סנן את התפקידים שאינם שווים לאינדקס שנמצא בפרמטר
      .map(positionGroup => positionGroup.get('positionId')?.value);
    return this.allPositions.filter(position => !selectedposition.includes(position.id));
  }
  
  onSubmit(): void {

    // Gather edited positions data
    const editedEmployee: Employee = {
      identity: this.editForm.value.identity,
      firstName: this.editForm.value.firstName,
      lastName: this.editForm.value.lastName,
      dateOfBirth: this.editForm.value.dateOfBirth,
      maleOrFemale: JSON.parse(this.editForm.value.maleOrFemale),
      employeePositions: this.editForm.value.employeePositions,
      startOfWorkDate: this.editForm.value.startOfWorkDate,
      status: true
    };

    // You can now do something with the edited positions data, like sending it to a service for update
    this._employeeService.updateEmployeeByIdentity(editedEmployee).subscribe({
      next: (res) => {
        console.log(res);
        this.openSnackBar();
        this.router.navigate(["allEmployees"]);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  openSnackBar() {

    this._snackBar.open('The employee details have been successfully updated', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,

    });
  }
}