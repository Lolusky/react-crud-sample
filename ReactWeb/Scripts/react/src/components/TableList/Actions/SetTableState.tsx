import { Action } from "redux";
import { TableState } from "../Domains/TableConfig";

export const SetTableStateDataActiontype = "set-table-state";
export interface SetTableStateDataAction extends Action {
    data: any;
}

export function setTableState(data: any) {

    return async (dispatch: (arg0: { type: string; data: any; }) => void, getSate: () => TableState) => {
        dispatch({
            type: SetTableStateDataActiontype,
            data,
        });
    };
}
