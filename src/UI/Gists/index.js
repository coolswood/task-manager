import React, { Component } from 'react';

import Gist from 'gist-client';

import { getAllData, syncData } from '../../api'

import './style.sass';

const gistClient = new Gist();

export default class GistsComponent extends Component {
    state = {
        id: null,
        show: false,
        isLogin: false
    };

    componentDidMount() {
        let distId = localStorage.getItem('gistId');

        if(distId !== null) {
            setTimeout(() => {
                this.logIn(distId)
            }, 3000)
        }
    }

    toggleShow = () => {
        this.setState({
            show: !this.state.show
        })
    };

    updateField = (type, text) => {
        this.setState({
            [type]: text.target.value
        })
    };

    restore = () => {
        gistClient.getOneById(localStorage.getItem('gistCurrent'))
            .then(response => {
                syncData(JSON.parse(response.files.ErrorList.content), (data) => {
                    this.props.syncData(data)
                })
            }).catch(err => {
            console.log(err)
        })
    };

    backup = () => {
        getAllData(data => {
            this.updateGist(data)
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
        let fullData = {};

        getAllData(data => {
            fullData = data;
        });

        // 9ebbdf2b44d57308af81c18ef8f298cbe2c79250

        gistClient.setToken(id);

        gistClient.getAll({filterBy: [
                {filename: 'ErrorList'}
            ]}).then((gistList) => {
                localStorage.setItem('gistId', id);

                if(gistList.length === 0) {
                    this.createGist(fullData).then(newGist => {
                        this.setState({
                            isLogin: true
                        })
                    }).catch(error => {
                        console.log(error, '2')
                    })
                } else {
                    localStorage.setItem('gistCurrent', gistList[0].id);

                    this.setState({
                        isLogin: true
                    });
                }
        }).catch(error => {
            console.log(error, '1')
        })

    };

    render() {
        const { show, isLogin } = this.state;

        return (
            <div className="gists">
                <img onClick={this.toggleShow} className="gists-img" src={require('../../img/github.png')} alt="gists"/>
                {show && <div className="page gists-popap">
                    {!isLogin && <div className="non-login">
                        <label>
                            <span>id:</span>
                            <input onChange={(e) => this.updateField('id', e)} type="text"/>
                        </label>
                        <button onClick={() => this.logIn(this.state.id)} className="ordinar">Авторизоваться</button>
                    </div>}
                    {isLogin && <div className="login">
                        <button onClick={this.backup} className="ordinar">backup</button>
                        <button onClick={this.restore} className="ordinar">restore</button>
                    </div>}
                </div>}
            </div>
        )
    }
}