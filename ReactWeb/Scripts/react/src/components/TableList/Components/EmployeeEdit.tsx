import * as React from "react";
import { Employee } from "../Domains/Employees";
import { ColumnData } from "../Domains/ColumnData";
import { EmployeeActivity } from "../Domains/EmployeeActivity";

interface EmpEditProp {
    currentRow: () => Employee;
    columnDef: ColumnData[];
    childColumnDef: ColumnData[];
    setParentState: (data: any) => void;
    dataSourceCellUpdate: (cellData: any, dataRow: Employee) => void;
    saveData: () => void;
    addEmpActivity: (currentRow: Employee) => Promise<void>;
    setChildRowState: (data: any, childRow: EmployeeActivity) => Promise<void>;
    deleteChildRow: (row: EmployeeActivity, parentRow: Employee) => void;
}


export class EmployeeEdit extends React.Component<EmpEditProp, any> {
    public render() {
        return (<div className="screen_cap">
            <div className="edit_box">

                <button
                    className="btn-close btn btn-danger btn-xs"
                    onClick={(e) => {
                        e.preventDefault();
                        this.props.setParentState({ showEdit: false });
                    }}
                >
                    <span className="glyphicon glyphicon-remove"></span>
                </button>

                <div className="row">
                    <div className="col col-sm-12 form-horizontal">
                        {this.props.columnDef.map((cc, ii) => {
                            return (<div className="form-group" key={`form-group${ii}`}>
                                <label className="control-label col-md-4">{cc.caption}</label>
                                <div className="col-md-8">
                                    <input type="text"
                                        className="form-control"
                                        name={cc.field}
                                        value={(this.props.currentRow() as any)[cc.field]}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.updateChanges(e)}
                                    ></input>
                                </div>
                            </div>);
                        })}
                        <div className="form-group">
                            <table className="table table-bordered table-condensed table-hover table-striped table-child">
                                <thead>
                                    <tr key={`child-header`}>
                                        {this.props.childColumnDef.map((c, indo) => <th key={`child-header-${indo}`}>{c.caption}</th>)}
                                        <td key={`header-${"add"}`} className="btn-col">
                                            <button className="btn btn-xs btn-success"
                                                onClick={(e) => this.addChild(e)}
                                            >Add</button>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.currentRow().employeeActivities.map((row, index) => {
                                        return this.renderChildRow(row, index);
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="form-group">
                            <div className="col-md-8 col-md-offset-4">
                                <button className="btn btn-success"
                                    onClick={(e) => {
                                        this.props.saveData();
                                        this.props.setParentState({ showEdit: false });
                                    }}
                                >Save</button>
                                <button className="btn btn-danger"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.props.setParentState({ showEdit: false });
                                    }}
                                >Close</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>);
    }

    private renderChildRow(row: EmployeeActivity, index: number) {
        return (
            <tr key={`child-row-${index}`} >
                {this.props.childColumnDef.map((c, indC) => <td key={`child-row-${index}-${indC}`}>
                    <input
                        type="text"
                        value={(row as any)[c.field]}
                        name={c.field}
                        onChange={(e) => {
                            this.updateChildChanges(e, row);
                        }}
                    ></input></td>)}
                <td key={`child-row-${index}-delete`}><button className="btn btn-xs btn-danger"
                    onClick={(e) => this.deleteChild(e, row)}
                >Delete</button></td>
            </tr>

        );
    }


    private updateChanges(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        this.props.dataSourceCellUpdate({
            [e.target.name]: e.target.value,
        }, this.props.currentRow());
    }

    private updateChildChanges(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, childRow: EmployeeActivity) {
        this.props.setChildRowState({
            [e.target.name]: e.target.value,
        }, childRow).then(() => {
            this.props.dataSourceCellUpdate({
                isDirty: true,
            }, this.props.currentRow());
        });

    }

    private deleteChild(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: EmployeeActivity) {
        this.props.deleteChildRow(row, this.props.currentRow());
    }
    private addChild(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        this.props.addEmpActivity(this.props.currentRow()).then(() => {
            this.props.dataSourceCellUpdate({
                isDirty: true,
            }, this.props.currentRow());
        });
    }
}
