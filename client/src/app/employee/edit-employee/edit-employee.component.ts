import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../models/all-employee-details.module';
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
import { RoleName } from '../../role-name';
import { EmployeeRole } from '../models/employee-role.module';
import { RoleNameService } from '../../role-name.service';
import { ValidatorFn } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';





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
    MatDatepicker
  ],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent implements OnInit {
  identity!: number
  employee!: Employee
  editForm!: FormGroup;
  public allPositions!: RoleName[];
  @Input() availablePositions: RoleName[] = [];
  @Input() employeeRoles: EmployeeRole[] = [];
  showWorkDetails: boolean = false;
  private birthDate!: Date
  private startOfWorkDate!: Date
  durationInSeconds = 1.5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  editRolesForm!: FormGroup;
  position: number = 0;
  constructor(
    private router: Router,
    private _employeeService: EmployeeService,
    private route: ActivatedRoute,
    private _roleNameService: RoleNameService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.identity = +params['identity'];
      console.log(this.identity);
    });
    this.returnAllRolesName()
    this.loadEmployee();

    // this.initForm();
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
  validateIdentity(control: AbstractControl): ValidationErrors | null {
    const identityNumber: string = control.value;
    // בודק אם המזהה הוא מחרוזת ספרות בדיוק באורך של 9 תווים
    if (!/^\d{9}$/.test(identityNumber)) {
      return { 'invalidLength': true };
    }
    return null;
  }
  // private minAgeValidator: ValidatorFn = (control: AbstractControl): Promise<ValidationErrors | null> => {
  //   return new Promise((resolve) => {
  //     this.birthDate = control.value;
  //     const today: Date = new Date();
  //     const minAgeDate: Date = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());

  //     if (this.birthDate > today) {
  //       resolve({ 'worngBirthDate': true })
  //     }
  //     else if (this.birthDate > minAgeDate) {
  //       resolve({ 'tooYoung': true });

  //     }
  //     else resolve(null)
  //   });
  // };
  // private startOfWorkValidator: ValidatorFn = (control: AbstractControl): Promise<ValidationErrors | null> => {

  //   return new Promise((resolve) => {
  //     this.startOfWorkDate = control.value;
  //     if (!this.birthDate || !this.startOfWorkDate) {
  //       console.log("null")
  //       resolve(null);
  //     }
  //     if (this.birthDate > this.startOfWorkDate)
  //       resolve({ 'tooEarlyToWork': true });

  //     const minAgeDate: Date = new Date(this.birthDate.getFullYear() + 16, this.birthDate.getMonth(), this.birthDate.getDate());
  //     console.log("minAgeDate", minAgeDate)
  //     if (this.startOfWorkDate < minAgeDate) {
  //       console.log("startOfWorkDate", this.startOfWorkDate, "minAgeDate", minAgeDate)
  //       resolve({ 'lessThan16Age': true });
  //     } else {
  //       resolve(null);

  //     }
  //   });
  // };












  // initForm(): void {
  //   this.editForm = this.fb.group({
  //     identity: ['', [Validators.required, this.validateIdentity]],
  //     firstName: ['', [Validators.required, Validators.minLength(3)]],
  //     lastName: ['', [Validators.required, Validators.minLength(3)]],
  //     dateOfBirth: ['', Validators.required, this.minAgeValidator],
  //     startOfWorkDate: ['', Validators.required, this.startOfWorkValidator],
  //     maleOrFemale: [false, Validators.required],
  //     roleEmployees: this.fb.array([]) // Initialize form array for employee roles
  //   });

  //   // Populate the roles form array with the employee's roles
  //   this.employee.roleEmployees.forEach(role => {
  //     this.addRole(role);
  //   });
  //   // this.createForm();
  //   const dateOfBirthControl = this.editForm.get('dateOfBirth');
  //   if (dateOfBirthControl) {
  //     dateOfBirthControl.valueChanges.subscribe(() => {
  //       this.editForm.get('startOfWorkDate')?.updateValueAndValidity(); // Trigger re-validation
  //     });
  //   }


  //   this.editForm.get('startOfWorkDate')?.valueChanges.subscribe(() => {
  //     // Trigger re-validation of the dateOfStartingWork field for each roleEmployee
  //     const roleEmployeesArray = this.editForm.get('roleEmployees') as FormArray;
  //     roleEmployeesArray.controls.forEach(control => {
  //       control.get('dateOfStartingWork')?.updateValueAndValidity();
  //     });
  //   });
  // }

  initForm(): void {
    this.editForm = this.fb.group({
      identity: [this.employee.identity, [Validators.required, this.validateIdentity]],
      firstName: [this.employee.firstName, [Validators.required, Validators.minLength(3)]],
      lastName: [this.employee.lastName, [Validators.required, Validators.minLength(3)]],
      //dateOfBirth: [new Date(this.employee.dateOfBirth), [Validators.required, this.minAgeValidator]],
      //startOfWorkDate: [new Date(this.employee.startOfWorkDate), [Validators.required, this.startOfWorkValidator]],
      dateOfBirth: [new Date(this.employee.dateOfBirth), [Validators.required]],
      startOfWorkDate: [new Date(this.employee.startOfWorkDate), [Validators.required]],
     
      maleOrFemale: [this.employee.maleOrFemale.toString(), Validators.required],
      roleEmployees: this.fb.array([]) // Initialize form array for employee roles
    });

    // Populate the roles form array with the employee's roles
    this.employee.roleEmployees.forEach(role => {
      console.log("roleDatails", role)
      this.addRole(role);
    });

    // Subscribe to changes in dateOfBirth to trigger re-validation of startOfWorkDate
    // const dateOfBirthControl = this.editForm.get('dateOfBirth');
    // if (dateOfBirthControl) {
    //   dateOfBirthControl.valueChanges.subscribe(() => {
    //     this.editForm.get('startOfWorkDate')?.updateValueAndValidity(); // Trigger re-validation
    //   });
    // }

    // // Subscribe to changes in startOfWorkDate to trigger re-validation of dateOfStartingWork for each roleEmployee
    // this.editForm.get('startOfWorkDate')?.valueChanges.subscribe(() => {
    //   const roleEmployeesArray = this.editForm.get('roleEmployees') as FormArray;
    //   roleEmployeesArray.controls.forEach(control => {
    //     control.get('dateOfStartingWork')?.updateValueAndValidity();
    //   });
    // });
  }
  editAddRole(): void {
    // if (!this.startOfWorkDate) {
    //   // אם המשתנה this.startOfWorkDate אינו מוגדר, התעלם מהוספת תפקיד והחזר מהפונקציה
    //   return;
    // }
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
  addRole(role: EmployeeRole): void {
    console.log("role", role)
    this.roleEmployeesFormArray.push(this.fb.group({
      roleNameId: [role.roleNameId, Validators.required],
      managerialPosition: [role ? role.managerialPosition : '', Validators.required],
      dateOfStartingWork: [role ? new Date(role.dateOfStartingWork) : '', Validators.required]
      // Add additional fields for the role if needed
      // For example:
      // roleName: [role.roleName, Validators.required],
      // someOtherField: [role.someOtherField, Validators.required],
    }));
  }
  getNameOfPosition(positionId: number): any {
    console.log("positionId",positionId)
    for (let po of this.allPositions)
      if (po.id === positionId)
      {
        console.log("po.roleName",po.roleName)
        return po.roleName
        
      }
    console.log("error")
  }
  get rolesFormArray(): FormArray {
    return this.editRolesForm.get('roles') as FormArray;
  }

  removeRole(index: number): void {
    // this.rolesFormArray.removeAt(index);
    this.roleEmployeesFormArray.removeAt(index)
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
  // createForm(): void {
  //   this.editForm = this.fb.group({
  //     identity: [this.employee.identity, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
  //     firstName: [this.employee.firstName, [Validators.required, Validators.minLength(3)]],
  //     lastName: [this.employee.lastName, [Validators.required, Validators.minLength(3)]],
  //     dateOfBirth: [new Date(this.employee.dateOfBirth), Validators.required], // Assuming date is in ISO string format
  //     maleOrFemale: [this.employee.maleOrFemale.toString(), Validators.required],
  //     // Add form controls for work details here if needed
  //   });
  // }
  private rolesi!: FormArray
  get roleEmployeesFormArray(): FormArray {
    this.rolesi = this.editForm.get('roleEmployees') as FormArray;
    console.log("roles", this.rolesi)
    return this.rolesi;
  }
  // filteredPositions(index: number): RoleName[] {
  //   if (!this.roleEmployeesFormArray||!this.allPositions) {
  //     return [];
  //   }
  //   const selectedRoles = this.roleEmployeesFormArray.controls
  //     .filter((control, i) => i !== index) // סנן את התפקידים שאינם שווים לאינדקס שנמצא בפרמטר
  //     .map(roleGroup => roleGroup.get('roleNameId')?.value);
  //   return this.allPositions.filter(position => !selectedRoles.includes(position.id));
  // }
  filteredPositions(index: number): RoleName[] {
    if (!this.roleEmployeesFormArray || !this.allPositions) {
      return [];
    }
    const selectedRoles = this.roleEmployeesFormArray.controls
      .filter((control, i) => i !== index) // סנן את התפקידים שאינם שווים לאינדקס שנמצא בפרמטר
      .map(roleGroup => roleGroup.get('roleNameId')?.value);
    return this.allPositions.filter(position => !selectedRoles.includes(position.id));
  }
  onSubmit(): void {
    // if (this.editRolesForm.invalid) {
    //   return;
    // }

    // Gather edited roles data
    const editedEmployee: Employee = {
      identity: this.editForm.value.identity,
      firstName: this.editForm.value.firstName,
      lastName: this.editForm.value.lastName,
      dateOfBirth: this.editForm.value.dateOfBirth,
      maleOrFemale: JSON.parse(this.editForm.value.maleOrFemale),
      roleEmployees: this.editForm.value.roleEmployees,
      startOfWorkDate: this.editForm.value.startOfWorkDate,
      status: true
    };

    // You can now do something with the edited roles data, like sending it to a service for update
    this._employeeService.updateEmployeeByIdentity(editedEmployee).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  
}