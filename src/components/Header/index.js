import React, { Component } from 'react';

import H1 from '../../UI/H1'

import Page from '../../UI/Page';
import TimerComponent from '../../UI/Timer';

import './style.sass';

import {Context} from '../../context';

export default class Header extends Component {
    static contextType = Context;

    createNewTask = () => {
        const { createNewTask } = this.context;

        createNewTask()
    };

    render() {
        return (
            <header>
                <div className="add" onClick={this.createNewTask}></div>
                <Page className="h1-page">
                    <H1 />
                </Page>
                <Page>
                    <div className="timer">
                        <TimerComponent />
                    </div>
                </Page>
            </header>
        );
    }
}