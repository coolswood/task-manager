import React, { Component } from 'react';
import Timer from './Timer'

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

        const timerStyle = {
            margin: "0px",
            padding: "1em"
        };

        const buttonStyle = {
            background: "#fff",
            color: "#666",
            border: "1px solid #ddd",
            marginRight: "5px",
            padding: "10px",
            fontWeight: "200",
            width: 80
        };

        const secondsStyles = {
            fontSize: "200%",
            fontWeight: "200",
            lineHeight: "1.5",
            margin: "0",
            color: "#666",
            textAlign: 'center'
        };

        const OPTIONS = {
            delay: 1000,
            autoplay: false,
            startTime: thisTask.timer || 0,
            play: 'Старт',
            pause: 'Пауза',
            reset: 'Очистить'
        };

        return (
            <Timer
                updateTimer={this.updateTimer}
                options={OPTIONS}
                timerStyle={timerStyle}
                buttonStyle={buttonStyle}
                secondsStyles={secondsStyles}
            />
        );
    }
}