import { SaveResponse } from "../Domains/SaveResponse";
import { Action } from "redux";
import { TableState } from "../Domains/TableConfig";

export const SaveDataActionType = "save-list";

export interface SaveDataAction extends Action {
    data: SaveResponse;
}

export function saveData(){
    return async (dispatch: (arg0: { type: string; data: SaveResponse; }) => void, getState: () => TableState) => {
        const state = getState();
        const response = await fetch(state.submitUrl, {
            method: "POST",
            body: JSON.stringify(state.dataSource.filter((e, i) => e.isDirty  )),
            headers: {
                "content-type": "application/json",
            },
            credentials: "same-origin",
        });

        const data = await response.json();

        dispatch({
            type: SaveDataActionType,
            data,
        });
    };
}
