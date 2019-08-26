import * as React from "react";
import * as ReactDOM from "react-dom";

import { TableList } from "../components/TableList/Components/TableList";
import { getElementValue } from "../lib/GetElementValue";
import { TableConfig } from "../components/TableList/Domains/TableConfig";
import { createTableStore } from "../components/TableList/Store";
import { Provider } from "react-redux";

const state = getElementValue<TableConfig>("app-form", "data-state");

const store = createTableStore(state);

ReactDOM.render(
    <Provider store={store} >
<TableList   />

    </Provider>
    ,
    document.getElementById("app-form")
);
