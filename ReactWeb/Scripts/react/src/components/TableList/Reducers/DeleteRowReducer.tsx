import { DeleteRowActionType, DeleteRowAction } from "../Actions/DeleteRow";
import { TableState } from "../Domains/TableConfig";
import _ = require("lodash");

export default {
    [DeleteRowActionType]: (state: TableState, action: DeleteRowAction) => {

        if (action.data.success) {
            const newList = _.remove(state.dataSource, (b) => b.employeeId !==  Number(action.data.data));

            const stateNew = Object.assign({}, state, { dataSource: newList, statusMessage: "Saved Sucessfully" });

            return stateNew;
        }
        else {
            return Object.assign({}, state, { errorMessage: action.data.message });
        }
    },
};
