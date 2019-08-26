import _ = require("lodash");
import { AddEmpActivityActionType, AddEmpActivityAction } from "../Actions/AddEmpActivity";
import { TableState } from "../Domains/TableConfig";

export default {
    [AddEmpActivityActionType]: (state: TableState, action: AddEmpActivityAction) => {

        const dataRows = state.dataSource.map((emp) => {
            if (emp.employeeId !==  state.currentEditPk) {
                return emp;
            }
            let activ = emp.employeeActivities;
            if (!activ) {
                activ = [];
            }
            activ.push(action.data);

            return Object.assign({}, emp, { employeeActivities: activ });
        });

        const stateNew = Object.assign({}, state, { dataSource: dataRows });

        return stateNew;
    },
};
