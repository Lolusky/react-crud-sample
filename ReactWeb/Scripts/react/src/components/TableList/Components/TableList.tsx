import * as React from "react";
import { connect } from "react-redux";
import { Dispatchers } from "../../../lib/Dispatchers";
import { TableState } from "../Domains/TableConfig";
import { addEmployeeRow } from "../Actions/AddEmployeeRow";
import { deleteEmployeeRow } from "../Actions/DeleteRow";
import { addEmpActivity } from "../Actions/AddEmpActivity";
import { saveData } from "../Actions/SaveData";
import { setTableState } from "../Actions/SetTableState";
import { dataSourceCellUpdate } from "../Actions/UpdateCell";
import { EmployeeEdit } from "./EmployeeEdit";
import { Employee } from "../Domains/Employees";
import { loadData } from "../Actions/LoadData";
import { setChildRowState } from "../Actions/SetChildRowState";
import { deleteChildRow } from "../Actions/DeleteChildRow";


const dispatchers = {
    addEmployeeRow,
    deleteEmployeeRow,
    saveData,
    setTableState,
    dataSourceCellUpdate,
    loadData,
    addEmpActivity,
    setChildRowState,
    deleteChildRow,
};

export type TableListProp = TableState & Dispatchers<typeof dispatchers>;

export class TableListComponent extends React.Component<TableListProp, any> {

    public constructor(props: TableListProp) {
        super(props);
        this.renderHeader = this.renderHeader.bind(this);
        this.addNewRow = this.addNewRow.bind(this);
        this.renderEditor = this.renderEditor.bind(this);
        this.getCurrentRow = this.getCurrentRow.bind(this);
        this.editRow = this.editRow.bind(this);
    }

    public componentDidMount() {
        this.props.loadData();
    }


    public render() {

        return (
            <div className="main_box">
                <table className="main_table table table-bordered table-condensed table-hover table-striped">
                    {this.renderHeader()}
                    <tbody>
                        {this.props.dataSource.map((dd, ii) => this.renderRow(dd, ii))}
                    </tbody>
                </table>
                {this.props.showEdit ? this.renderEditor() : null}
                {this.props.statusMessage ? this.renderMessage() : null}
                {this.props.errorMessage ? this.renderError() : null}
            </div>

        );
    }


    public getCurrentRow(): Employee {
        if (isNaN(this.props.currentEditPk)) {
            return null;
        }

        if (this.props.currentEditPk === 0) {
            return null;
        }
        const currentRow = this.props.dataSource.find((emp) => emp.employeeId === this.props.currentEditPk);

        return currentRow;
    }

    private renderEditor() {
        const style1 = {
            position: "absolute" as "absolute",
            top: "0",
            marginLeft: "15px",
        };

        if (this.getCurrentRow() === null) {
            this.props.setTableState({ errorMessage: "No current record" });

            return null;
        }

        return <EmployeeEdit
            columnDef={this.props.columnDef}
            childColumnDef={this.props.childColumnDef}
            currentRow={this.getCurrentRow}
            setParentState={this.props.setTableState}
            dataSourceCellUpdate={this.props.dataSourceCellUpdate}
            saveData={this.props.saveData}
            addEmpActivity={this.props.addEmpActivity}
            setChildRowState={this.props.setChildRowState}
            deleteChildRow={this.props.deleteChildRow}
        ></EmployeeEdit>;
    }



    private renderMessage() {
        const msgStyle = {
            color: "blue",
            fontSize: "12px",
        };

        return (<i style={msgStyle} >{this.props.statusMessage}</i>);
    }
    private renderError() {
        const errStyle = {
            color: "red",
            fontSize: "12px",
        };

        return (<i style={errStyle} >{this.props.errorMessage}</i>);
    }

    private renderHeader() {
        return (<thead>
            <tr>
                <td key={`h${0}`}>
                    <button className="btn btn-success btn-xs"
                        onClick={(e) => {
                            this.addNewRow();
                        }}
                    >Add</button>
                </td>{this.props.columnDef.map((cc, i) => <th key={`h${i + 1}`}>{cc.caption}</th>)}
                <th key={`h${this.props.columnDef.length + 2}`}>Activity Count</th>
                <td key={`h${this.props.columnDef.length + 3}`}></td>
            </tr>
        </thead>);
    }

    private renderRow(data: any, ind: number) {

        return (<tr key={ind + 1}>
            <td key={`${ind}-${0}`}><button className="btn btn-info btn-xs"
                onClick={(e) => {
                    this.editRow(data);
                }}
            >Edit</button></td>
            {this.props.columnDef.map((cc, i) => {

                return (<td key={`${ind}-${i}`}>{data[cc.field]}</td>);
            })}
            <td key={`${ind}-count`} >
                {(data as Employee).employeeActivities.length}
            </td>
            <td key={`${ind}-${this.props.columnDef.length + 2}`}>
                <button className="btn btn-danger btn-xs"
                    onClick={(e) => this.props.deleteEmployeeRow(data)}
                >Delete</button>
            </td>
        </tr>);
    }

    private editRow(emp: Employee) {
        this.props.setTableState({
            showEdit: true,
            currentEditPk: emp.employeeId,
        });
    }

    private addNewRow() {
        this.props.addEmployeeRow()
            .then(() => {
                this.props.setTableState({
                    showEdit: true,
                    currentEditPk: this.props.dataSource[this.props.dataSource.length - 1].employeeId,
                });
            });
    }
}


export const TableList = connect(
    (state: TableState): TableState => {

        const newState = Object.assign({}, state, {
            dataSource: state.dataSource ? state.dataSource : [],
            lastGenPK: state.lastGenPK && !isNaN(state.lastGenPK) ? state.lastGenPK : 0,
        });

        return newState;
    }
    ,
    dispatchers
)(TableListComponent);
