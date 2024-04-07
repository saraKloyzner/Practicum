import { EmployeeRole } from "./employee/models/employee-role.module"

export class RoleName {

    id: number
    roleName: string
    roleEmployees: EmployeeRole[];

    constructor(id: number, roleName: string, roleEmployees: EmployeeRole[]) {
        this.id = id;
        this.roleName = roleName;
        this.roleEmployees = roleEmployees
    }

}
