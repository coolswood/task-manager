import React, { Component } from 'react'
import SecondsTohhmmss from './SecondsTohhmmss'
import PropTypes from 'prop-types'
import Ripples from 'react-ripples'

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
    const { timerStyle, secondsStyles, buttonsStyle, buttonStyle, prefix, options } = this.props;
    const { play, pause, reset, rippleColor, rippleDuring } = options;

    return (
      <div style={timerStyle} className="react-timer">
        <h3 style={secondsStyles} className="seconds"> {this.state.time || defaultTime} {prefix}</h3>
        <br />
        <div style={buttonsStyle} className="react-timer__buttons">
          {reset && <Ripples color={rippleColor} during={rippleDuring} style={buttonStyle} onClick={this.reset.bind(this)}><span>{reset}</span></Ripples>}
          {play && <Ripples color={rippleColor} during={rippleDuring} style={buttonStyle} onClick={this.play.bind(this)}><span>{play}</span></Ripples>}
          {pause && <Ripples color={rippleColor} during={rippleDuring} style={buttonStyle} onClick={this.pause.bind(this)}><span>{pause}</span></Ripples>}
        </div>
      </div>
    )
  }
}
