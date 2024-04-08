import { EmployeePosition } from "./employee-position.module";

export class Position {

    id: number
    name: string
    employeePositions: EmployeePosition[];

    constructor(id: number, name: string, employeePositions: EmployeePosition[]) {
        this.id = id;
        this.name = name;
        this.employeePositions = employeePositions
    }

}
