import React, { Component } from 'react';

import InputForm from '../../UI/InputForm';
import Page from '../../UI/Page';
import ListItem from './components/ListItem';

import './style.sass';

export default class AddEvent extends Component {
    render() {
        const { h2, color, type } = this.props;

        return (
            <Page>
                <div className="add-event">
                    <h2>{h2}</h2>
                    <InputForm />
                    <div className="list">
                        <ListItem color={color} type={type} />
                        <ListItem color={color} />
                        <ListItem color={color} />
                        <ListItem color={color} />
                    </div>
                </div>
            </Page>
        );
    }
}