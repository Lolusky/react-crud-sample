import { Action } from "redux";
import { TableState } from "../Domains/TableConfig";
import { EmployeeActivity } from "../Domains/EmployeeActivity";

export const SetChildDataCellStateActionType = "set-child-data-cell-state";
export interface SetChildDataCellStateAction extends Action {
    data: any;
    childRow: EmployeeActivity;
}

export function setChildRowState(data: any, childRow: EmployeeActivity) {

    return async (dispatch: (arg0: { type: string; data: any;  childRow: EmployeeActivity}) => void, getSate: () => TableState) => {
        dispatch({
            type: SetChildDataCellStateActionType,
            data,
            childRow,
        });
    };
}
