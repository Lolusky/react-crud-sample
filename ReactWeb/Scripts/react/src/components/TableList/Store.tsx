import { createStore } from "../../lib/StoreFactory";
import addEmployeeReducer from "./Reducers/AddEmployeeReducer";
import deleteRowReducer from "./Reducers/DeleteRowReducer";
import saveDataReducer from "./Reducers/SaveDataReducer";
import setTableStatereducer from "./Reducers/SetTableStateReducer";
import updateCellReducer from "./Reducers/UpdateCellReducer";
import loadDataReducer from "./Reducers/LoaddataReducer";
import addEmpActivityReducer from "./Reducers/AddEmpActivityReducer";
import setChildRowStateReducer from "./Reducers/SetChildRowStateReducer";

export const createTableStore = (initialState: any) => createStore(
    {
        ...addEmployeeReducer,
        ...deleteRowReducer,
        ...saveDataReducer,
        ...setTableStatereducer,
        ...updateCellReducer,
        ...loadDataReducer,
        ...addEmpActivityReducer,
        ...setChildRowStateReducer,
    },
    initialState
);
