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
        const { thisTask } = this.context;

        return (
            <Fragment>
                <button className="burger-open" onClick={this.toggleMenu}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#fff" viewBox="0 0 512 512"><path d="M491.318 235.318H20.682C9.26 235.318 0 244.577 0 256s9.26 20.682 20.682 20.682h470.636c11.423 0 20.682-9.259 20.682-20.682 0-11.422-9.259-20.682-20.682-20.682zM491.318 78.439H20.682C9.26 78.439 0 87.699 0 99.121c0 11.422 9.26 20.682 20.682 20.682h470.636c11.423 0 20.682-9.26 20.682-20.682 0-11.422-9.259-20.682-20.682-20.682zM491.318 392.197H20.682C9.26 392.197 0 401.456 0 412.879s9.26 20.682 20.682 20.682h470.636c11.423 0 20.682-9.259 20.682-20.682s-9.259-20.682-20.682-20.682z"/></svg></button>
                <nav className={`main-nav ${open ? 'nav-opened' : ''}`}>
                    <div className="burger-close" onClick={this.toggleMenu}></div>
                    <div className="wrap">
                        {headers && headers.map((item) => {
                            return <div className="delete-wrap">
                                <div onClick={() => this.deleteTask(item)} className="delete"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 512 512"><path d="M353.574 176.526l-40.078-1.47-8.689 237.284 40.078 1.464zM235.948 175.791h40.104v237.285h-40.104zM207.186 412.334l-8.689-237.285-40.078 1.471 8.69 237.284z"/><path d="M17.379 76.867v40.104h41.789L92.32 493.706c.909 10.353 9.579 18.294 19.972 18.294h286.74c10.394 0 19.07-7.947 19.972-18.301l33.153-376.728h42.464V76.867H17.379zm363.286 395.029H130.654L99.426 116.971H411.9l-31.235 354.925z"/><path d="M321.504 0H190.496c-18.428 0-33.42 14.992-33.42 33.42v63.499h40.104V40.104h117.64v56.815h40.104V33.42c0-18.428-14.992-33.42-33.42-33.42z"/></svg></div>
                                <button className={`nav-item ${thisTask.h1 === item ? 'nav-item--active' : ''}`} onClick={() => this.changeTask(item)}>{item}</button>
                            </div>
                        })}
                    </div>
                </nav>
            </Fragment>
        );
    }
}