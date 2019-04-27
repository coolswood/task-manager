import React, { Component } from 'react';

import Gist from 'gist-client';
import Ripple from '@intereact/ripple'
import OutsideClickHandler from 'react-outside-click-handler';

import { getAllData, syncData } from '../../api'

import './style.sass';

const gistClient = new Gist();

export default class GistsComponent extends Component {

    state = {
        id: null,
        show: false,
        isLogin: false,
        autFailed: false
    };

    componentDidMount() {
        let distId = localStorage.getItem('gistId');

        if(distId === null) return;

        this.logIn(distId)
    }

    toggleShow = (type) => {
        this.setState({
            show: type === 'close' ? false : !this.state.show
        })
    };

    updateField = (type, text) => {
        this.setState({
            [type]: text.target.value
        })
    };

    restore = (e) => {
        let button = e.target.style;
        gistClient.getOneById(localStorage.getItem('gistCurrent'))
            .then(response => {
                syncData(JSON.parse(response.files.ErrorList.content), (data) => {
                    this.props.syncData({
                        thisTask: data.thisTask,
                        commonData: data.commonData
                    });
                    button.background = '#049823';
                    setTimeout(() => {
                        button.background = '';
                    }, 500)
                })
            })
    };

    backup = (e) => {
        let button = e.target.style;

        getAllData(data => {
            this.updateGist(data);
            button.background = '#049823';
            setTimeout(() => {
                button.background = '';
            }, 500)
        });
    };

    createGist = (fullData) => {
        return gistClient.create({
            "files": {
                "ErrorList": {
                    "content": JSON.stringify(fullData)
                }
            },
            "description": "error",
            "public": true
        })
    };

    updateGist = (fullData) => {
        gistClient.update(localStorage.getItem('gistCurrent'), {
            "files": {
                "ErrorList": {
                    "content": JSON.stringify(fullData)
                }
            },
            "description": "error",
            "public": true
        })
    };

    logIn = (id) => {

        gistClient.setToken(id);

        gistClient.getAll({filterBy: [
                {filename: 'ErrorList'}
            ]}).then((gistList) => {
                localStorage.setItem('gistId', id);

                if(gistList.length === 0) {
                    getAllData(fullData => {
                        this.createGist(fullData).then(() => {
                            this.setState({
                                isLogin: true
                            })
                        })
                    });
                } else {
                    localStorage.setItem('gistCurrent', gistList[0].id);

                    this.setState({
                        isLogin: true
                    });
                }
        }).catch(() => {
            this.setState({
                autFailed: true
            })
        })

    };

    render() {
        const { show, isLogin, autFailed } = this.state;

        return (
            <OutsideClickHandler
                onOutsideClick={() => {
                    this.toggleShow('close')
                }}>
            <div className="gists">
                <img onClick={this.toggleShow} className={`gists-img ${isLogin ? 'aut-pulse' : 'gists-img__non-aut'}`} src={require('../../img/github.png')} alt="gists"/>
                {show && <div className="page gists-popup">
                    {!isLogin && <div className="non-login">
                        <h2>Синхронизация с Gists</h2>
                        <label>
                            <span>GitHub token:</span>
                            <input placeholder="9ebbdf2b44d57308af81c18ef8f298cbe2c79250" onChange={(e) => this.updateField('id', e)} type="text"/>
                        </label>
                        {autFailed && <div className="error">Неверный токен</div>}
                        <Ripple>
                            { (ripples) => (
                                <button style={{ position: 'relative' }}>
                                    { ripples }
                                    <button onClick={() => this.logIn(this.state.id)} className="ordinar fiolet">Авторизоваться</button>
                                </button>
                            ) }
                        </Ripple>
                    </div>}
                    {isLogin && <div className="login">
                        <h2>Синхронизировано с Gists</h2>
                        <div className="button-wrap">
                            <Ripple>
                                { (ripples) => (
                                    <button onClick={this.backup} className="ordinar fiolet" style={{ position: 'relative' }}>
                                        { ripples }
                                        backup
                                    </button>
                                ) }
                            </Ripple>
                            <Ripple>
                                { (ripples) => (
                                    <button onClick={this.restore} className="ordinar fiolet" style={{ position: 'relative' }}>
                                        { ripples }
                                        restore
                                    </button>
                                ) }
                            </Ripple>
                        </div>
                    </div>}
                </div>}
            </div>
        </OutsideClickHandler>
        )
    }
}