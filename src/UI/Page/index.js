import React from 'react';

import './style.sass';

export default (props) => {
    return (
        <div style={props.style} className={`page ${props.className ? props.className : ''}`}>
            {props.children}
        </div>
    )
}