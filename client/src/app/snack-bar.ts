import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
  } from '@angular/material/snack-bar';
  import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class snackBar{
    durationInSeconds = 2.5;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    constructor(private _snackBar: MatSnackBar){}  
openSnackBar(value:string) {

    this._snackBar.open(value, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,

    });
  }
}