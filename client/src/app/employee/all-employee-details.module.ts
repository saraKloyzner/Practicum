import { EmployeeRole } from "./employee-role.module";

export class Employee {
  // id: number;
  identity!: string;
  firstName!: string;
  lastName!: string;
  startOfWorkDate!: string;
  dateOfBirth!: string; // Add this line
  maleOrFemale!: boolean;
  status!:boolean
  roleEmployees!: EmployeeRole[];

  
}
// constructor( identity: string, firstName: string, lastName: string, startOfWorkDate: 
  //   string, dateOfBirth: string, maleOrFemale: boolean, roleEmployees: EmployeeRole[]) {
  //     // this.id = id;
  //     this.identity = identity;
  //     this.firstName = firstName;
  //     this.lastName = lastName;
  //     this.startOfWorkDate = startOfWorkDate;
  //     this.dateOfBirth = dateOfBirth;
  //     this.maleOrFemale = maleOrFemale;
  //     this.roleEmployees = roleEmployees;
  // }