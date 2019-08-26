
import { LoadDataActionType, LoadDataAction} from "../Actions/LoadData";
import { TableState } from "../Domains/TableConfig";
import { Employee } from "../Domains/Employees";

export default {
    [LoadDataActionType]: (state: TableState, action: LoadDataAction) => {

        if (action.data.success) {
            const maxEmp  = (action.data.data as Employee[]).reduce((a, b) => a.employeeId >=  b.employeeId ? a : b );

            const stateNew = Object.assign({}, state, { dataSource: action.data.data, lastGenPK: maxEmp.employeeId });

            return stateNew;

        }
        else {
            return Object.assign({}, state, { errorMessage: action.data.message });
        }
    },
};
