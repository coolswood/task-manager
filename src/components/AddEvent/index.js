import React, { Component } from 'react';

import InputForm from '../../UI/InputForm';
import ListItem from './components/ListItem';

import './style.sass';

export default class AddEvent extends Component {
    render() {
        const { h2, color, type, data, id } = this.props;

        return (
            <div className="add-event">
                <h2>{h2}</h2>
                {type !== 'mistakes' && <InputForm type={type} id={id} />}

                {data.length === 0 && <div>Нету</div>}

                {type === 'ordinar' &&
                    <div className="list">
                        {data.map((item, i) => {
                            return <ListItem
                                value={item}
                                color={color}
                                type={type}
                                key={i}
                                id={id}
                                i={i + 1}
                            />
                        })}
                    </div>
                }

                {type !== 'ordinar' &&
                    <div className="list">
                        {Object.keys(data).map((item, i) => {
                            return <ListItem
                                value={[data[item], item]}
                                color={color}
                                type={type}
                                key={i}
                                id={id}
                                i={i + 1}
                            />
                        })}
                    </div>
                }

            </div>
        );
    }
}