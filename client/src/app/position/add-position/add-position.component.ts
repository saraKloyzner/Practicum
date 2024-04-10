import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { PositionService } from '../../services/position.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PositionPostModel } from '../../models/PositionPostModel.module';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
// import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-position',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule],
  templateUrl: './add-position.component.html',
  styleUrl: './add-position.component.scss'
})
export class AddPositionComponent implements OnInit {
  durationInSeconds = 2.5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private _positionService: PositionService,
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar) { this.valid() }
  AddPositionForm!: FormGroup;
  ngOnInit(): void {

    if (localStorage.getItem('token') === null){ 
      this.openSnackBar("Takes you to login")
      this.router.navigate(['login'])
    return;
    }
 
    this.valid()
    this.AddPositionForm = this.formBuilder.group({
      positionName: ['', Validators.required],

    });
  }
  valid() {
    
    // this._userService.getIsTrueToken().subscribe({
    //   next: (res) => {
    //     console.log("isTrueToken", res)
    //     if (res === false)
    //       this.router.navigate(['login'])
    //     console.log("go login")

    //   },
    //   error: (err) => {
    //     console.log("err", err);
    //   }
    // })
    this._userService.getIsTrueToken().subscribe({
      next: (res) => {
        if (typeof res === 'boolean') {
          console.log("isTrueToken", res);
          if (!res) {
            this.router.navigate(['login']);
          }
        } else {
          console.error("Invalid response format:", res);
        }
      },
      error: (err) => {
        console.log("err", err);
      }
    });
    return;
  }
  
  onSubmit(): void {
    const user: PositionPostModel = {
      name: this.AddPositionForm.get('positionName')?.value,

    }
    this._positionService.addPosition(user).subscribe({
      next: (res) => {
        console.log("post position", res);
        this.openSnackBar("The position was successfully added")
        this.router.navigate(["allEmployees"])
      },
      error: (err) => {
        console.log(err);

      }
    })
    // Add logic to send the new position data to the backend or handle as needed
    console.log('New Position Name:', user.name);
    user.name = ''; // Clear the input field after adding
  }
  openSnackBar(value:string) {

    this._snackBar.open(value, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,

    });
  }
}
