import { SetTableStateDataActiontype, SetTableStateDataAction } from "../Actions/SetTableState";
import { TableState } from "../Domains/TableConfig";

export default {
    [SetTableStateDataActiontype]: (state: TableState, action: SetTableStateDataAction) => {

        const stateNew = Object.assign({}, state, action.data);

        return stateNew;
    },
};
