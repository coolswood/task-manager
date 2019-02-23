import React, {Component} from 'react';

export default class ListItem extends Component {
    state = {
        checked: false
    };

    toggleState = () => {
        this.setState({
            checked: !this.state.checked
        })
    };

    render() {
        const { type, color, value, id } = this.props;
        const { checked } = this.state;

        if(type === 'checklist') {
            return (
                <div className={`list-item list-item__${type}`} onClick={this.toggleState}>
                    <span hidden={!checked} className="check-sign">✔ </span>
                    <span>{value.name}</span>
                </div>
            )
        }

        if(type === 'mistakes') {
            console.log(value)
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