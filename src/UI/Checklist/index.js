import React, { Component } from 'react';

import './style.sass';

import ItemChecklist from "./components/ItemChecklist";

export default class Checklist extends Component {

    render() {
        const {data} = this.props;

        data.map((item, i) => {
            return <ItemChecklist
                value={item}
                key={i}
                i={i + 1}
                {...this.props}
            />
        })
    }
}