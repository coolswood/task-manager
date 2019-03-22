import React, { Component } from 'react';

import './style.sass';

import {Context} from "../../context";

export default class Index extends Component {
    static contextType = Context;

    constructor(props) {
        super(props);
        this.input = React.createRef();
    }

    submit = (e) => {
        e.preventDefault();
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
            <form className="form" onSubmit={this.submit}>
                <div className="data-list-wrapper">
                    <input list={id === 'addMistake' ? 'list' : ''} ref={this.input} />
                    <datalist id="list">
                        {Object.keys(commonData.errors).map((item) => {
                            return <option value={item} key={item} />
                        })}
                    </datalist>
                </div>
                <button className="ordinar" type="submit" variant="outline-primary">Добавить</button>
            </form>
        );
    }
}