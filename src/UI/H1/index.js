import React, { Component } from 'react';

import OutsideClickHandler from 'react-outside-click-handler';

import './style.sass';

import {Context} from "../../context";

export default class H1 extends Component {
    static contextType = Context;

    state = {
      edit: false
    };

    constructor(props) {
        super(props);
        this.input = React.createRef();
    }

    toggleH1 = () => {
        this.setState({
            edit: !this.state.edit
        })
    };

    saveVal = (e) => {
        if(!this.state.edit) return;
        const { changeH1 } = this.context;
        let text = this.input.current.value;

        if((e && e.keyCode === 13) || !e) {
            changeH1(text);
            this.setState({
                edit: false
            })
        }
    };

    render() {
        const { thisTask } = this.context;
        const { edit } = this.state;

        return (
            <OutsideClickHandler
                onOutsideClick={() => {
                    this.saveVal()
                }}>
                <div className="h1-wrapper">
                    {edit ?
                        <input ref={this.input} onKeyDown={this.saveVal} defaultValue={thisTask.h1} type="text"/> :
                        <h1 onClick={this.toggleH1}>{thisTask.h1}</h1>
                    }
                </div>
            </OutsideClickHandler>
        );
    }
}