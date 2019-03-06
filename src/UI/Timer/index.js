import React, { Component } from 'react';
import Timer from 'react-timer'

import {Context} from "../../context";

import './style.sass';

export default class TimerComponent extends Component {
    static contextType = Context;

    updateTimer = (time) => {
        const { saveTimer } = this.context;

        saveTimer(time)
    };

    render() {
        const { thisTask } = this.context;
        const OPTIONS = { delay: 1000, autoplay: false, startTime: thisTask.timer || 0};

        return (
            <Timer updateTimer={this.updateTimer} options={OPTIONS} />
        );
    }
}