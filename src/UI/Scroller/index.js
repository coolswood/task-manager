import React, { Component } from 'react';

import './style.sass';

let interval = '';

export default class Scroller extends Component {

    state = {
      offset: 0
    };

    scrollLongName = (e) => {
        if(e.target.offsetWidth + this.state.offset > this.props.minWidth) {
            interval = setInterval(() => {
                this.setState({
                    offset: this.state.offset + 1
                });
            }, 30);
        }
    };

    stopScroll = () => {
        clearInterval(interval);
        this.setState({
            offset: 0
        })
    };

    render() {
        const { minWidth, children } = this.props;
        return (
            <div className='scroller-wrap'>
                <div ref={this.props.ref} style={{minWidth: minWidth, left: - this.state.offset}} onMouseOver={this.scrollLongName} onMouseLeave={this.stopScroll} className='scroller-text'>{children}</div>
            </div>
        );
    }
}