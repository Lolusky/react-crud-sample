import { Action } from "redux";
import { EmployeeActivity } from "../Domains/EmployeeActivity";
import { Employee } from "../Domains/Employees";
import { TableState } from "../Domains/TableConfig";

export const AddEmpActivityActionType = "child-add-row";
export interface AddEmpActivityAction extends Action {
    employeeRow: Employee;
    data: EmployeeActivity;
}

export function addEmpActivity(currentRow: Employee) {

    return async (dispatch: (arg0: { type: string; data: EmployeeActivity; }) => void, getState: () => TableState) => {
        const state = getState();
        const maxEmpAct = currentRow.employeeActivities && currentRow.employeeActivities.length > 1
            ? currentRow.employeeActivities.reduce((a, b) => a.id >= b.id ? a : b)
            : currentRow.employeeActivities && currentRow.employeeActivities.length === 1
                ? currentRow.employeeActivities[0]
                : null;

        const newRow = {
            title: "",
            description: "",
            date: "",
            id: maxEmpAct ? maxEmpAct.id + 1 : 1,
        } as EmployeeActivity;

        dispatch({
            type: AddEmpActivityActionType,
            data: newRow,
        });
    };
}
