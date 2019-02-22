import React, { Component, Fragment } from 'react';

import Page from './UI/Page'

import AddEvent from './components/AddEvent'
import Header from './components/Header'

export default class App extends Component {
  render() {
    return (
        <Fragment>
            <div className="background" />
            <div className="app">
                <Header />
                <section>
                    <main>
                        <AddEvent
                            h2="Добавить ошибку"
                            color={'error'}
                        />
                        <AddEvent
                            h2="Нашел ошибку"
                            color={'check'}
                        />
                    </main>
                    <aside>
                        <AddEvent
                            h2="Checklist"
                            type="checklist"
                        />
                    </aside>
                </section>
            </div>
        </Fragment>
    );
  }
}
