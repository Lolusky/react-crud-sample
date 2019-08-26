import _ = require("lodash");
import { AddRowActionType, AddRowAction } from "../Actions/AddEmployeeRow";
import { TableState } from "../Domains/TableConfig";

export default {
    [AddRowActionType]: (state: TableState, action: AddRowAction) => {

        let dataRows = state.dataSource;
        if (!dataRows) {
            dataRows = [];
        }
        dataRows.push(action.data);
        const stateNew = Object.assign({}, state, { dataSource: dataRows, lastGenPK: action.newPkId });

        return stateNew;
    },
};
