import { Action } from "redux";
import { Employee } from "../Domains/Employees";
import { TableState } from "../Domains/TableConfig";

export const DataSourceCellUpdateActionType = "data-source-cell-update";
export interface DataSourceCellUpdateAction extends Action {
    cellData: any;
    dataRow: Employee;
}

export function dataSourceCellUpdate(cellData: any, dataRow: Employee) {

    return async (dispatch: (arg0: { type: string; cellData: any; dataRow: Employee; }) => void, getState: () => TableState) => {
        const theData = Object.assign({}, cellData, {isDirty: true});

        dispatch({
            type: DataSourceCellUpdateActionType,
            cellData: theData,
            dataRow,
        });
    };
}
