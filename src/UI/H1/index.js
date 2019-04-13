import React, { Component } from 'react';

import OutsideClickHandler from 'react-outside-click-handler';

import './style.sass';

import {Context} from "../../context";

export default class H1 extends Component {
    static contextType = Context;

    state = {
      edit: false
    };

    constructor(props) {
        super(props);
        this.input = React.createRef();
    }

    toggleH1 = () => {
        this.setState({
            edit: !this.state.edit
        })
    };

    saveVal = (e) => {
        if(!this.state.edit) return;
        const { changeH1, thisTask } = this.context;
        let text = this.input.current.value;

        if((e && e.keyCode === 13) || !e) {
            if(this.input.current.value === '') {
                text = thisTask.h1
            }
            changeH1(text);
            setTimeout(() => {
                this.setState({
                    edit: false
                })
            }, 0)
        }
    };

    render() {
        const { thisTask } = this.context;
        const { edit } = this.state;

        return (
            <OutsideClickHandler
                onOutsideClick={() => {
                    this.saveVal()
                }}>
                <div className="h1-wrapper">
                    <div onClick={this.toggleH1} className="h1-wrapper__edit"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#fff" viewBox="0 0 55.25 55.25"><path d="M52.618 2.631c-3.51-3.508-9.219-3.508-12.729 0L3.827 38.693c-.017.017-.027.038-.042.056-.021.024-.039.05-.058.076a.972.972 0 0 0-.125.239c-.009.026-.022.049-.029.075l-.012.03-3.535 14.85a.991.991 0 0 0-.022.202c0 .013-.004.025-.004.038a.995.995 0 0 0 .095.403c.049.107.11.21.196.296a1.006 1.006 0 0 0 .938.266l14.85-3.535c.027-.006.051-.021.077-.03a.985.985 0 0 0 .3-.162c.024-.019.049-.033.072-.054.008-.008.018-.012.026-.02L52.617 15.36c3.51-3.51 3.51-9.22.001-12.729zm-1.414 1.414c2.488 2.489 2.7 6.397.65 9.137l-9.787-9.787c2.741-2.05 6.649-1.838 9.137.65zm-4.95 14.85l-9.9-9.9 1.414-1.414 9.9 9.9-1.414 1.414zM4.961 50.288a.999.999 0 0 0-1.414 0l-.757.757 2.554-10.728 4.422-.491-.569 5.122c-.004.038.01.073.01.11 0 .038-.014.072-.01.11.004.033.021.06.028.092a1.016 1.016 0 0 0 .245.473c.048.051.1.094.157.134.045.031.088.06.138.084.066.031.135.049.207.066.038.009.069.03.108.035a.982.982 0 0 0 .109.006h.004a.995.995 0 0 0 .109-.006l5.122-.569-.491 4.422-10.729 2.554.757-.757a1 1 0 0 0 0-1.414zm12.55-5.479L39.889 22.43a.999.999 0 1 0-1.414-1.414L16.097 43.395l-4.773.53.53-4.773 22.38-22.378a.999.999 0 1 0-1.414-1.414L10.44 37.738l-3.183.354L34.94 10.409l9.9 9.9-27.683 27.683.354-3.183zm31.571-28.742l-9.9-9.9 1.415-1.415 9.9 9.9-1.415 1.415z"/></svg></div>
                    {edit ?
                        <input ref={this.input} onKeyDown={this.saveVal} defaultValue={thisTask.h1} type="text"/> :
                        <h1>{thisTask.h1}</h1>
                    }
                </div>
            </OutsideClickHandler>
        );
    }
}