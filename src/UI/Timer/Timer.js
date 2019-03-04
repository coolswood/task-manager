import React, { Component } from 'react'
import SecondsTohhmmss from './SecondsTohhmmss'
import PropTypes from 'prop-types'

let offset = null, interval = null;
const defaultTime = '00:00:00';

/**
 * Timer module
 * A simple timer component.
**/
export default class Timer extends Component {
  static get propTypes () {
    return {
      options: PropTypes.object
    }
  }

  constructor(props) {
    super(props);
    this.state = { clock: props.options.startTime || 0, time: SecondsTohhmmss(props.options.startTime / 1000) }
  }

  componentDidMount() {
    if(this.props.autoplay) {
      this.play()
    }
  }

  componentWillUnmount() {
    this.pause()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.options.startTime !== this.state.clock) {
      this.setState({
        clock: nextProps.options.startTime,
        time: SecondsTohhmmss(this.props.options.startTime / 1000)
      })
    }

    return true
  }

  pause() {
    if (interval) {
      clearInterval(interval)
      interval = null
    }
  }

  play() {
    if (!interval) {
      offset = Date.now()
      interval = setInterval(this.update, this.props.options.delay)
    }
  }

  reset() {
    let clockReset = 0;
    this.setState({clock: clockReset })
    let time = SecondsTohhmmss(clockReset / 1000)
    this.setState({time: time })
  }

  update = () => {
    let clock = this.state.clock;
    clock += this.props.options.delay;
    this.setState({clock: clock })
    let time = SecondsTohhmmss(clock / 1000)
    this.setState({time: time })

    this.props.updateTimer(clock)
  };

  render() {
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
      fontWeight: "200"
    };

    const secondsStyles = {
      fontSize: "200%",
      fontWeight: "200",
      lineHeight: "1.5",
      margin: "0",
      color: "#666"
    };

    return (
      <div style={timerStyle} className="react-timer">
        <h3 style={secondsStyles} className="seconds"> {this.state.time || defaultTime} {this.props.prefix}</h3>
        <br />
        <button onClick={this.reset.bind(this)} style={buttonStyle} >reset</button>
        <button onClick={this.play.bind(this)} style={buttonStyle} >play</button>
        <button onClick={this.pause.bind(this)} style={buttonStyle} >pause</button>
      </div>
    )
  }
}
