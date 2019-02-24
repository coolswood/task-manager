import React, { Component, Fragment } from 'react';

import './style.sass';

export default class Nav extends Component {

    state = {
        open: false
    };

    toggleMenu = () => {
        this.setState({
            open: !this.state.open
        })
    };

    render() {
        const { open } = this.state;
        const { headers } = this.props;

        return (
            <Fragment>
                <button className="burger-open" onClick={this.toggleMenu}>Открыть</button>
                <nav className={`main-nav ${open ? 'nav-opened' : ''}`}>
                    <div className="burger-close" onClick={this.toggleMenu}></div>
                    <div className="wrap">
                        {headers.map((item) => {
                            return <button className="nav-item">{item}</button>
                        })}
                    </div>
                </nav>
            </Fragment>
        );
    }
}