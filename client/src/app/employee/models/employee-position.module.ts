

export class EmployeePosition {
  positionId!: number;
  employeeId!: number;

  dateOfStartingWork!: Date;
  status!: boolean
  private _managerialPosition!: boolean;

  public get managerialPosition(): boolean {
    return this._managerialPosition;
  }

  public set managerialPosition(value: string) {
    this._managerialPosition = value === 'true'; // שינוי: השוואה קפדנית
  }

  constructor(positionId: number, employeeId: number, dateOfStartingWork: Date) {
    this.positionId = positionId;
    this.employeeId = employeeId;

    this.dateOfStartingWork = dateOfStartingWork;
  }
}