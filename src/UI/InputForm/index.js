import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import './style.sass';

import {Context} from "../../context";

export default class Index extends Component {
    static contextType = Context;

    constructor(props) {
        super(props);
        this.input = React.createRef();
    }

    submit = () => {
        const { addNewMistake, addNewFind } = this.context;
        const { type } = this.props;
        let text = this.input.current.value;

        switch (type) {
            case 'ordinar':
                addNewMistake(text)
                break;
            case 'ordinarFind':
                addNewFind(text)
                break;
        }

        this.input.current.value = '';
    };

    render() {
        return (
            <div className="form">
                <div className="data-list-wrapper">
                    <input ref={this.input} />
                    <datalist id="<идентификатор>">
                        <option value="Текст1" />
                        <option value="Текст2" />
                    </datalist>
                </div>
                <Button variant="outline-primary" onClick={this.submit}>Добавить</Button>
            </div>
        );
    }
}