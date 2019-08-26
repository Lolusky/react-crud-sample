import { Action } from "redux";
import { SaveResponse } from "../Domains/SaveResponse";
import { TableState } from "../Domains/TableConfig";

export const LoadDataActionType = "load-list";

export interface LoadDataAction extends Action {
    data: SaveResponse;
}

export function loadData(){
    return async (dispatch: (arg0: { type: string; data: SaveResponse; }) => void, getState: () => TableState) => {
        const state = getState();
        const response = await fetch(state.loadDataUrl, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            credentials: "same-origin",
        });

        const data = await response.json();

        dispatch({
            type: LoadDataActionType,
            data,
        });
    };
}
