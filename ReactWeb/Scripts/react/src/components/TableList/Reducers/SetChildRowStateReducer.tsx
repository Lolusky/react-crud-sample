import { TableState } from "../Domains/TableConfig";
import { SetChildDataCellStateActionType, SetChildDataCellStateAction } from "../Actions/SetChildRowState";

export default {
    [SetChildDataCellStateActionType]: (state: TableState, action: SetChildDataCellStateAction) => {
        const dataRows = state.dataSource.map((emp) => {
            if (emp.employeeId !== state.currentEditPk) {
                return emp;
            }
            let activ = emp.employeeActivities;
            if (!activ) {
                activ = [];
            }
            const newChildRows = activ.map((cc) => {
                if (cc.id !== action.childRow.id) {
                    return cc;
                }

                return Object.assign({}, cc, action.data);
            });

            return Object.assign({}, emp, { employeeActivities: newChildRows });
        });

        const stateNew = Object.assign({}, state, {dataSource: dataRows});

        return stateNew;
    },
};
