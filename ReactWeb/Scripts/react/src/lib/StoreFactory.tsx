import * as _ from "lodash";
import {Action, Reducer} from "redux";
import thunkMiddleware from "redux-thunk";
import {Store, createStore as createReduxStore, applyMiddleware, compose} from "redux";


declare const window: any;

// tslint:disable-next-line:typedef
export const createStore = <State extends {}>(reducers: any, initialState: State = {} as State) => {

    // tslint:disable-next-line:typedef
    const keyValueDispatchReducer = (state: State = initialState, action: Action): State => {

        if (_.has(reducers, action.type)) {

            return reducers[action.type](state, action);
        }

        return state;
    };

    if (window.devToolsExtension) {

        return createReduxStore(keyValueDispatchReducer, compose(applyMiddleware(thunkMiddleware as any), window.devToolsExtension()));
    }

    return createReduxStore(keyValueDispatchReducer, compose(applyMiddleware(thunkMiddleware as any)));
};
