import { Action } from "redux";
import { TableState } from "../Domains/TableConfig";
import { Employee } from "../Domains/Employees";

export const AddRowActionType = "table-add-row";
export interface AddRowAction extends Action {
    data: Employee;
    newPkId: number;
}

export function addEmployeeRow() {

    return async (dispatch: (arg0: { type: string; data: Employee; newPkId: number; }) => void, getState: () => TableState) => {
        const state = getState();
        const nextId = (state.lastGenPK && !isNaN(state.lastGenPK) ? state.lastGenPK : 0) + 1;

        const newRow = {
            firstName: "",
            lastName: "",
            age: 20,
            address: "",
            country: "",
            employeeId: nextId,
            isDirty: true,
        } as Employee;

        dispatch({
            type: AddRowActionType,
            data: newRow,
            newPkId: nextId,
        });
    };
}
