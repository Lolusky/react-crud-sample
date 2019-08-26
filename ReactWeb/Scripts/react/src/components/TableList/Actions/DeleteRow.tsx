import { Action } from "redux";
import { TableState } from "../Domains/TableConfig";
import { Employee } from "../Domains/Employees";
import { SaveResponse } from "../Domains/SaveResponse";

export const DeleteRowActionType = "table-delete-row";
export interface DeleteRowAction extends Action {
    data: SaveResponse;
}

export function deleteEmployeeRow(row: Employee) {

    return async (dispatch: (arg0: { type: string; data: SaveResponse; }) => void, getState: () => TableState) => {
        const state = getState();

        const formData = new FormData();
        formData.append("employeeId", row.employeeId.toString());

        const response = await fetch(state.deleteUrl, {
            method: "POST",
            body: formData,
            credentials: "same-origin",
        });

        const data = await response.json();

        dispatch({
            type: DeleteRowActionType,
            data,
        });
    };
}
