import React, { Component } from 'react';
import Timer from 'react-timer-simple'

import {Context} from "../../context";

import './style.sass';

export default class TimerComponent extends Component {
    static contextType = Context;

    updateTimer = (time) => {
        const { updateTimer } = this.context;

        updateTimer(time)
    };

    render() {
        const { thisTask } = this.context;
        const { limit } = this.props;

        const timerStyle = {
            margin: "0px",
            padding: "1em"
        };

        const buttonsStyle = {
            display: "flex"
        };

        const buttonStyle = {
            background: "#fff",
            color: "#8e44ad",
            borderRadius: "30px",
            border: "1px solid #8e44ad",
            margin: "0 5px",
            padding: "10px 40px",
            fontWeight: "400",
            width: "100%",
            fontSize: 14,
            textTransform: "uppercase",
            letterSpacing: "0.42px",
            cursor: "pointer",
            textAlign: "center"
        };

        const secondsStyles = {
            fontSize: "64px",
            fontWeight: "400",
            lineHeight: "75px",
            margin: "0",
            color: "#312f2f",
            textAlign: 'center'
        };

        const limitStyle = {
            position: 'absolute',
            top: 20,
            right: 20,
            color: "#312f2f",
            fontWeight: "400",
            fontSize: "20px"
        };

        const overTime = {
            fontSize: "64px",
            fontWeight: "400",
            lineHeight: "75px",
            margin: "0",
            color: "rgb(232, 79, 100)",
            textAlign: 'center'
        };

        const OPTIONS = {
            autoplay: false,
            limit: limit,
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
                buttonsStyle={buttonsStyle}
                buttonStyle={buttonStyle}
                secondsStyles={secondsStyles}
                overTime={overTime}
                limitStyle={limitStyle}
            />
        );
    }
}