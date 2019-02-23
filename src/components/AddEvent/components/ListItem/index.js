import React, {Component} from 'react';

export default class ListItem extends Component {

    render() {
        const { type, color, value, id } = this.props;

        if(type === 'checklist') {
            return (
                <div className={`list-item list-item__${type}`}>
                    <span hidden={!value.checked} className="check-sign">✔ </span>
                    <span>{value.name}</span>
                </div>
            )
        }

        if(type === 'mistakes') {
            return (
                <div className={`list-item list-item__${type}`} onClick={this.toggleState}>
                    <span className="mistake-cnt">{value.cnt}</span>
                    <span>{value.name}</span>
                </div>
            )
        }
        return (
            <div className={`list-item list-item--${color}`}>
                <span className="nmb">{id}. </span>
                <span>{value}</span>
            </div>
        )
    }
}