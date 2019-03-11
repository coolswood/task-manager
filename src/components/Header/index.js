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
                <div className="add" onClick={this.createNewTask}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 491.86 491.86"><path d="M465.167 211.614H280.245V26.691c0-8.424-11.439-26.69-34.316-26.69s-34.316 18.267-34.316 26.69v184.924H26.69C18.267 211.614 0 223.053 0 245.929s18.267 34.316 26.69 34.316h184.924v184.924c0 8.422 11.438 26.69 34.316 26.69s34.316-18.268 34.316-26.69V280.245H465.17c8.422 0 26.69-11.438 26.69-34.316s-18.27-34.315-26.693-34.315z"/></svg></div>
                <Page className="h1-page">
                    <H1 />
                </Page>
                <Page className="timer-wrap">
                    <div className="timer">
                        <TimerComponent />
                    </div>
                </Page>
            </header>
        );
    }
}