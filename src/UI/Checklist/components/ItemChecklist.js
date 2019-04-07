import React, { Component } from 'react';

import './style.sass';
import Scroller from "../../../components/AddEvent/components/ListItem";

export default class ChecklistItem extends Component {


    render() {
        const { type, value} = this.props;
        let isChecked = value[0] ? 'checkbox__checked' : '';

        return (
            <div style={{order: 0}} ref={this.checkbox} className={`delete-wrap ${isChecked}`}>
                <div onClick={() => this.deleteTask()} className="delete"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 512 512"><path d="M353.574 176.526l-40.078-1.47-8.689 237.284 40.078 1.464zM235.948 175.791h40.104v237.285h-40.104zM207.186 412.334l-8.689-237.285-40.078 1.471 8.69 237.284z"/><path d="M17.379 76.867v40.104h41.789L92.32 493.706c.909 10.353 9.579 18.294 19.972 18.294h286.74c10.394 0 19.07-7.947 19.972-18.301l33.153-376.728h42.464V76.867H17.379zm363.286 395.029H130.654L99.426 116.971H411.9l-31.235 354.925z"/><path d="M321.504 0H190.496c-18.428 0-33.42 14.992-33.42 33.42v63.499h40.104V40.104h117.64v56.815h40.104V33.42c0-18.428-14.992-33.42-33.42-33.42z"/></svg></div>
                <div className={`list-item list-item__${type}`} onClick={this.toggleChecklist}>
                    {!value[0] ? <span className="check-sign"></span> : <div className="check-sign check-sign__checked">&#10004;</div>}
                    <Scroller ref={this.name} minWidth={550}>{value[1]}</Scroller>
                </div>
            </div>
        )
    }
}