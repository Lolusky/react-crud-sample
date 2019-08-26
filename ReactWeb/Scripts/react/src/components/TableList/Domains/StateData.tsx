import { Employee } from "./Employees";

export interface StateData{
    showEdit: boolean;
    dataSource: Employee[];
    lastGenPK: number;
    lastChildPK: number;
    currentEditPk: number;
    statusMessage: string;
    errorMessage: string;
}
