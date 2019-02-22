import React, { Component } from 'react';

import Page from '../../UI/Page';

import './style.sass';

export default class Header extends Component {
    render() {
        return (
            <header>
                <div className="add"></div>
                <Page>
                    <h1>Название задачи</h1>
                    <div className="timer"></div>
                </Page>
            </header>
        );
    }
}