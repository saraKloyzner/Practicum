import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup,
    ValidationErrors, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../models/all-employee-details.module';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Position } from '../../models/position';
import { EmployeePosition } from '../../models/employee-position.module';
import { ValidatorFn } from '@angular/forms';
import { Functions } from '../functions-add-edit';
import { snackBar } from '../../snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-employee',
  providers: [provideNativeDateAdapter()],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent implements OnInit {
  identity!: number
  employee!: Employee
  editForm!: FormGroup;
  @Input() availablePositions: Position[] = [];
  @Input() employeePositions: EmployeePosition[] = [];
  showWorkDetails: boolean = false;
  private startOfWorkDate!: Date
  editPositionForm!: FormGroup;
  position: number = 0;
  constructor(
    private router: Router,
    private _employeeService: EmployeeService,
    private route: ActivatedRoute,
    private _snack: snackBar,
    private fb: FormBuilder,
    private _function:Functions,
    ) { }
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.identity = params['identity'] as number;
        console.log(this.identity);
      });
  
    this._function.returnAllPositions()
    this.loadEmployee();
  }
  onDateOfBirthChange(): void {
    this.editForm.get('dateOfBirth')?.updateValueAndValidity();
  }

  initForm(): void {
    this.editForm = this.fb.group({
      identity: [this.employee.identity, [Validators.required, this._function.validateIdentity]],
      firstName: [this.employee.firstName, [Validators.required, Validators.minLength(3)]],
      lastName: [this.employee.lastName, [Validators.required, Validators.minLength(3)]],
      dateOfBirth: [new Date(this.employee.dateOfBirth), [Validators.required,  this._function.dateOfBirthVaidator()]],
      startOfWorkDate: [new Date(this.employee.startOfWorkDate), [Validators.required, this._function.startOfWorkValidator()]],
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
    for (let po of this._function.allPositions)
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
    if (this.identity == null) {
        console.log('Identity is not defined yet.');
        return;
    }

    this._employeeService.getEmployeeByIdentity(this.identity.toString()).subscribe({
        next: (res) => {
            console.log("employee", res);
            this.employee = res;
            this.initForm();
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
    if (!this.employeePositionsFormArray || !this._function.allPositions) {
      return [];
    }
    const selectedposition = this.employeePositionsFormArray.controls
      .filter((control, i) => i !== index) // סנן את התפקידים שאינם שווים לאינדקס שנמצא בפרמטר
      .map(positionGroup => positionGroup.get('positionId')?.value);
    return this._function.allPositions.filter(position => !selectedposition.includes(position.id));
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
        this._snack.openSnackBar('The employee details have been successfully updated');
        this.router.navigate(["employee/allEmployees"]);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}