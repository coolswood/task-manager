import React, { Component } from 'react';

import Page from '../../UI/Page';
import TimerComponent from '../../UI/Timer';

import './style.sass';

import {Context} from '../../context';

export default class Header extends Component {
    static contextType = Context;

    render() {
        const { thisTask } = this.context;

        return (
                <header>
                    <div className="add"></div>
                    <Page className="h1-page">
                        <h1>{thisTask.h1}</h1>
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