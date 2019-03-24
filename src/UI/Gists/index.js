import React, { Component } from 'react';

import Gists from 'gists';

import './style.sass';

export default class GistsComponent extends Component {
    state = {
        login: null,
        password: null,
        show: false
    };

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

    logIn = () => {
        const {login, password} = this.state;

        const gists = new Gists({
            username: login,
            password: password
        });

        gists.get()
            .then(res => console.log(res.body))
            .catch(console.error);

        // localStorage.setItem('gists', data.body.id)
    };

    render() {
        const { show } = this.state;

        return (
            <div className="gists">
                <img onClick={this.toggleShow} className="gists-img" src={require('../../img/github.png')} alt="gists"/>
                {show && <div className="page gists-popap">
                    <label>
                        <span>Введите имя:</span>
                        <input onChange={(e) => this.updateField('login', e)} type="text"/>
                    </label>
                    <label>
                        <span>Введите пароль:</span>
                        <input onChange={(e) => this.updateField('password', e)} type="text"/>
                    </label>
                    <button onClick={this.logIn} className="ordinar">Авторизоваться</button>
                </div>}
            </div>
        )
    }
}