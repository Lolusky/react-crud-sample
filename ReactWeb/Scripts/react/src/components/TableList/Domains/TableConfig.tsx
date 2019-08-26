import { ColumnData } from "./ColumnData";
import { StateData } from "./StateData";
import { Employee } from "./Employees";

export interface TableConfig{
    columnDef: ColumnData[];
    childColumnDef: ColumnData[];
    submitUrl: string;
    fetchUrl: string;
    deleteUrl: string;
    loadDataUrl: string;

}

/* export interface TableState {
    columnDef: ColumnData[];
    submitUrl: string;
    fetchUrl: string;
    deleteUrl: string;
    showEdit: boolean;
    dataSource: Employee[];
    lastGenPK: number;
    currentEditPk: number;
    statusMessage: string;
    errorMessage: string;
} */

export type TableState = StateData  & TableConfig;
