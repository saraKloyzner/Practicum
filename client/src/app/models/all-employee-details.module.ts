import { EmployeePosition } from "./employee-position.module";
export class Employee {
  // id: number;
  identity!: string;
  firstName!: string;
  lastName!: string;
  startOfWorkDate!: string;
  dateOfBirth!: string; // Add this line
  maleOrFemale!: boolean;
  status!:boolean
  employeePositions!: EmployeePosition[];

  
}
