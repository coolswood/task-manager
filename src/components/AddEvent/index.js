import React, { Component } from 'react';

import CustomScroll from 'react-customscroll';

import InputForm from '../../UI/InputForm';
import ListItem from './components/ListItem';

import './style.sass';

export default class AddEvent extends Component {

    state = {
        dataLength: this.props.data.length ? this.props.data.length : Object.keys(this.props.data).length
    };

    static getDerivedStateFromProps(props, state) {
        return {
            dataLength: props.data.length ? props.data.length : Object.keys(props.data).length
        }
    }

    render() {
        const { h2, color, type, data, id } = this.props;

        return (
            <div className={`add-event ${type === 'mistakes' ? 'add-event-mistake' : ''}`}>
                {h2 && <h2>{h2}</h2>}
                {type !== 'mistakes' && <InputForm type={type} id={id} />}

                {(!data || data.length === 0) && <div></div>}

                {!!data && type === 'ordinar' &&
                    <div style={this.state.dataLength > 5 ? {height: 300} : {}} className="list">
                        <CustomScroll>
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
                        </CustomScroll>
                    </div>
                }

                {!!data && type !== 'ordinar' &&
                    <div style={this.state.dataLength > 5 ? {height: 300} : {}} className="list">
                        <CustomScroll>
                            {Object.keys(data).map((item, i) => {
                                return <ListItem
                                    value={[data[item], item]}
                                    color={color}
                                    type={type}
                                    key={i}
                                    id={id}
                                    i={i + 1}
                                    isLast={Object.keys(data).length - 1 === i}
                                />
                            })}
                        </CustomScroll>
                    </div>
                }

            </div>
        );
    }
}