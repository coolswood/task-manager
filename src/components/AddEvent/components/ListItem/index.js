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
        const { type, color } = this.props;
        const { checked } = this.state;

        if(type === 'checklist') {
            return (
                <div className={`list-item list-item__${type}`} onClick={this.toggleState}>
                    <span hidden={!checked} className="check-sign">✔ </span>
                    <span>Гребаная невнимательность</span>
                </div>
            )
        }
        return (
            <div className={`list-item list-item--${color}`}>
                <span className="nmb">1. </span>
                <span>Гребаная невнимательность</span>
            </div>
        )
    }
}