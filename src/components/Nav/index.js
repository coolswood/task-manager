import React, { Component, Fragment } from 'react';

import './style.sass';

import {Context} from '../../context';

export default class Nav extends Component {
    static contextType = Context;

    state = {
        open: false
    };

    toggleMenu = () => {
        this.setState({
            open: !this.state.open
        })
    };

    changeTask = (text) => {
        const { changeTask } = this.context;

        changeTask(text)
    };

    deleteTask = (text) => {
        const { deleteTask } = this.context;

        deleteTask(text)
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
                        {headers && headers.map((item) => {
                            return <div className="delete-wrap">
                                <div onClick={() => this.deleteTask(item)} className="delete">-</div>
                                <button className="nav-item" onClick={() => this.changeTask(item)}>{item}</button>
                            </div>
                        })}
                    </div>
                </nav>
            </Fragment>
        );
    }
}