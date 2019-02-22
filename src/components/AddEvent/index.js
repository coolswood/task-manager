import React, { Component } from 'react';

import InputForm from '../../UI/InputForm';
import Page from '../../UI/Page';
import ListItem from './components/ListItem';

import './style.sass';

export default class AddEvent extends Component {
    render() {
        return (
            <Page>
                <div className="add-event">
                    <h2>Добавить ошибку</h2>
                    <InputForm />
                    <div className="list">
                        <ListItem />
                        <ListItem />
                        <ListItem />
                        <ListItem />
                    </div>
                </div>
            </Page>
        );
    }
}