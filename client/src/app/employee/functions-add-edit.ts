import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Position } from "../models/position";
import { PositionService } from "../services/position.service";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Functions {
    private birthDate!:Date
    private startOfWorkDate!:Date;
    private dateOfStartingWork!:Date;
    public allPositions: Position[] = [];
    constructor (private _positionService: PositionService){}
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
  
     public dateOfStartPosition(): ValidatorFn{
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
    validateIdentity(control: AbstractControl): ValidationErrors | null {
      const identityNumber: string = control.value;
      // בודק אם המזהה הוא מחרוזת ספרות בדיוק באורך של 9 תווים
      if (!/^\d{9}$/.test(identityNumber)) {
        return { 'invalidLength': true };
      }
      return null;
    }
    returnAllPositions() {
      this._positionService.getPositions().subscribe({
        next: (res) => {
          console.log("allPosition",res)
          this.allPositions = res;
          console.log("allPositions", this.allPositions)
  
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
  