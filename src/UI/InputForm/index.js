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
        const { addNewMistake, addNewFind, addLocalChecklist, addCommonChecklist } = this.context;
        const { id } = this.props;
        let text = this.input.current.value;

        if(text === '') return;

        switch (id) {
            case 'addMistake':
                addNewMistake(text);
                break;
            case 'findMistake':
                addNewFind(text);
                break;
            case 'localChecklist':
                addLocalChecklist(text);
                break;
            case 'commonChecklist':
                addCommonChecklist(text);
                break;
        }

        this.input.current.value = '';
    };

    render() {
        const { commonData } = this.context;
        const { id } = this.props;

        return (
            <div className="form">
                <div className="data-list-wrapper">
                    <input list={id === 'addMistake' ? 'list' : ''} ref={this.input} />
                    <datalist id="list">
                        {Object.keys(commonData.errors).map((item) => {
                            return <option value={item} key={item} />
                        })}
                    </datalist>
                </div>
                <Button variant="outline-primary" onClick={this.submit}>Добавить</Button>
            </div>
        );
    }
}