import { SaveDataActionType, SaveDataAction } from "../Actions/SaveData";
import { DeleteChildRowActionType, DeleteChildRowAction } from "../Actions/DeleteChildRow";
import { TableState } from "../Domains/TableConfig";
import { Employee } from "../Domains/Employees";

export default {
    [SaveDataActionType]: (state: TableState, action: SaveDataAction) => {

        if (action.data.success) {
            const employeeData = state.dataSource.map((bb: Employee, ind: number) => {
                const lRow = (action.data.data as Employee[]).find((l) => l.employeeId === bb.employeeId);
                if (!lRow) {
                    return bb;
                }

                return Object.assign({}, bb, { ...lRow, isDirty: false });
            });

            const stateNew = Object.assign({}, state, { dataSource: employeeData, statusMessage: "Saved Sucessfully" });

            return stateNew;

        }
        else {
            return Object.assign({}, state, { errorMessage: action.data.message });
        }
    },
    [DeleteChildRowActionType]: (state: TableState, action: DeleteChildRowAction) => {

        if (action.data.success) {
            const employeeData = state.dataSource.map((bb: Employee, ind: number) => {
                const lRow = (action.data.data as Employee[]).find((l) => l.employeeId === bb.employeeId);
                if (!lRow) {
                    return bb;
                }

                return Object.assign({}, bb, { ...lRow, isDirty: false });
            });

            const stateNew = Object.assign({}, state, { dataSource: employeeData, statusMessage: "Saved Sucessfully" });

            return stateNew;

        }
        else {
            return Object.assign({}, state, { errorMessage: action.data.message });
        }
    },

};
