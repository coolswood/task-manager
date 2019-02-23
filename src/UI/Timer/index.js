import React, { Component } from 'react';
import Timer from 'react-timer'

import './style.sass';

const OPTIONS = { delay: 1000};
export default class TimerComponent extends Component {
    render() {
        return (
            <Timer options={OPTIONS} />
        );
    }
}