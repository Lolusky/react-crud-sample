import { EmployeeActivity } from "./EmployeeActivity";

export interface Employee {
    employeeId: number;
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    country: string;
    isDirty: boolean;
    employeeActivities: EmployeeActivity[];
}
