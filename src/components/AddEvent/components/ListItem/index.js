import React, {Component} from 'react';

import {Context} from "../../../../context";

export default class ListItem extends Component {
    static contextType = Context;

    constructor(props) {
        super(props);
        this.name = React.createRef();
    }

    toggleChecklist = () => {
        const { toggleChecklist } = this.context;
        const { i, id } = this.props;

        let text = this.name.current.innerHTML;
        toggleChecklist(text, id)
    };

    deleteTask = () => {
        const { deleteItemTask } = this.context;
        const { id, value } = this.props;

        deleteItemTask(value, id)
    };

    render() {
        const { type, color, value, i } = this.props;

        if(type === 'checklist') {
            return (
                <div className="delete-wrap">
                    <div onClick={() => this.deleteTask()} className="delete">-</div>
                    <div className={`list-item list-item__${type}`} onClick={this.toggleChecklist}>
                        <span hidden={!value[0]} className="check-sign">✔ </span>
                        <span ref={this.name}>{value[1]}</span>
                    </div>
                </div>
            )
        }

        if(type === 'mistakes') {
            return (
                <div className={`list-item list-item__${type}`} onClick={this.toggleState}>
                    <span className="mistake-cnt">{value[0]}</span>
                    <span>{value[1]}</span>
                </div>
            )
        }
        return (
            <div className="delete-wrap">
                <div onClick={this.deleteTask} className="delete">-</div>
                <div className={`list-item list-item--${color}`}>
                    <span className="nmb">{i}. </span>
                    <span>{value}</span>
                </div>
            </div>
        )
    }
}