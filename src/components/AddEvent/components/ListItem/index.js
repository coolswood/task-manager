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

    render() {
        const { type, color, value, i } = this.props;

        if(type === 'checklist') {
            return (
                <div className={`list-item list-item__${type}`} onClick={this.toggleChecklist}>
                    <span hidden={!value[0]} className="check-sign">✔ </span>
                    <span ref={this.name}>{value[1]}</span>
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
            <div className={`list-item list-item--${color}`}>
                <span className="nmb">{i}. </span>
                <span>{value}</span>
            </div>
        )
    }
}