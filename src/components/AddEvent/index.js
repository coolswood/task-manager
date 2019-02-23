import React, { Component } from 'react';

import InputForm from '../../UI/InputForm';
import ListItem from './components/ListItem';

import './style.sass';

export default class AddEvent extends Component {
    render() {
        const { h2, color, type, data } = this.props;

        return (
            <div className="add-event">
                <h2>{h2}</h2>
                {type !== 'mistakes' && <InputForm />}
                <div className="list">
                    {data.map((item, id) => {
                        return <ListItem
                            value={item}
                            color={color}
                            type={type}
                            key={id}
                            id={id + 1}
                        />
                    })}
                </div>
            </div>
        );
    }
}