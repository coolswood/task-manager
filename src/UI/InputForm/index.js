import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import './style.sass';

export default class Index extends Component {
    render() {
        return (
            <div className="form">
                <div className="data-list-wrapper">
                    <input list="<идентификатор>" />
                    <datalist id="<идентификатор>">
                        <option value="Текст1" />
                        <option value="Текст2" />
                    </datalist>
                </div>
                <Button variant="outline-primary">Добавить</Button>
            </div>
        );
    }
}