import { TableState } from "../Domains/TableConfig";
import { DataSourceCellUpdateActionType, DataSourceCellUpdateAction } from "../Actions/UpdateCell";
import { Employee } from "../Domains/Employees";

export default {
    [DataSourceCellUpdateActionType]: (state: TableState, action: DataSourceCellUpdateAction) => {
        const dataRows = state.dataSource.map((emp: Employee, ind: number) => {

            if (emp.employeeId !== action.dataRow.employeeId) {

                return emp;
            }

            const newE = Object.assign({}, emp, action.cellData);

            return newE;
        });

        const stateNew = Object.assign({}, state, { dataSource: dataRows });

        return stateNew;
    },
};
