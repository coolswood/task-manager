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
                <button className="burger-open" onClick={this.toggleMenu}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#fff" viewBox="0 0 512 512"><path d="M491.318 235.318H20.682C9.26 235.318 0 244.577 0 256s9.26 20.682 20.682 20.682h470.636c11.423 0 20.682-9.259 20.682-20.682 0-11.422-9.259-20.682-20.682-20.682zM491.318 78.439H20.682C9.26 78.439 0 87.699 0 99.121c0 11.422 9.26 20.682 20.682 20.682h470.636c11.423 0 20.682-9.26 20.682-20.682 0-11.422-9.259-20.682-20.682-20.682zM491.318 392.197H20.682C9.26 392.197 0 401.456 0 412.879s9.26 20.682 20.682 20.682h470.636c11.423 0 20.682-9.259 20.682-20.682s-9.259-20.682-20.682-20.682z"/></svg></button>
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