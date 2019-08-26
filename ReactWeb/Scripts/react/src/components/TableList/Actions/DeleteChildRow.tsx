import { Action } from "redux";
import { TableState } from "../Domains/TableConfig";
import { Employee } from "../Domains/Employees";
import { SaveResponse } from "../Domains/SaveResponse";
import { EmployeeActivity } from "../Domains/EmployeeActivity";

export const DeleteChildRowActionType = "table-delete-child-row";
export interface DeleteChildRowAction extends Action {
    data: SaveResponse;
}

export function deleteChildRow(row: EmployeeActivity, parentRow: Employee) {

    return async (dispatch: (arg0: { type: string; data: SaveResponse; }) => void, getState: () => TableState) => {
        const state = getState();

        parentRow.employeeActivities = parentRow.employeeActivities.filter((ee) => ee.id !== row.id);

        const response = await fetch(state.submitUrl, {
            method: "POST",
            body: JSON.stringify([{ ...parentRow, isDirty: true }]),
            headers: {
                "content-type": "application/json",
            },
            credentials: "same-origin",
        });

        const data = await response.json();

        dispatch({
            type: DeleteChildRowActionType,
            data,
        });


    };
}
