

export class EmployeeRole {
  roleNameId!: number;
  employeeId!: number;

  dateOfStartingWork!: Date;
  status!:boolean 
  private _managerialPosition!: boolean;

  public get managerialPosition(): boolean {
    return this._managerialPosition;
  }

  public set managerialPosition(value: string) {
    this._managerialPosition = value === 'true'; // שינוי: השוואה קפדנית
  }

  constructor(roleNameId: number, employeeId: number, dateOfStartingWork: Date) {
      this.roleNameId = roleNameId;
      this.employeeId = employeeId;
      
      this.dateOfStartingWork = dateOfStartingWork;
  }
}