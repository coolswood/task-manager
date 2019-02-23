import React, { Component, Fragment } from 'react';

import Page from './UI/Page'

import { Tabs, Tab, Button } from 'react-bootstrap';

import AddEvent from './components/AddEvent'
import Header from './components/Header'

import {Context} from './context';

export default class App extends Component {
    state = {
        thisTask: {
            h1: "Заголовок задачи",
            thisErrorList: [
                'Ошибка',
                'Ошибка',
                'Ошибка'
            ],
            thisFindList: [
                'Нашел',
                'Нашел',
                'Нашел'
            ],
            checklist: [
                {name: 'Задача', complite: true},
                {name: 'Задача', complite: true},
                {name: 'Задача', complite: false}
            ]
        },
        commonData: {
            checklist: [
                {name: 'Задача', complite: true},
                {name: 'Задача', complite: true},
                {name: 'Задача', complite: false}
            ],
            errors: [
                {name: 'Ошибка', cnt: 1},
                {name: 'Ошибка', cnt: 10},
                {name: 'Ошибка', cnt: 5}
            ]
        }
    };

  render() {
      const { thisTask, commonData } = this.state;

    return (
        <Context.Provider value = {this.state}>
            <div className="background" />
            <div className="app">
                <Header />
                <section>
                    <main>
                        <Page>
                            <AddEvent
                                h2="Добавить ошибку"
                                color={'error'}
                                data={thisTask.thisErrorList}
                            />
                        </Page>
                        <Page>
                            <AddEvent
                                h2="Нашел ошибку"
                                color={'check'}
                                data={thisTask.thisFindList}
                            />
                        </Page>
                    </main>
                    <aside>
                        <Page>
                            <Tabs defaultActiveKey="checklist">
                                <Tab eventKey="thisChecklist" title="Checklist задачи">
                                    <AddEvent
                                        h2="Checklist задачи"
                                        type="checklist"
                                        data={thisTask.checklist}
                                    />
                                </Tab>
                                <Tab eventKey="checklist" title="checklist">
                                    <AddEvent
                                        h2="Checklist"
                                        type="checklist"
                                        data={commonData.checklist}
                                    />
                                </Tab>
                            </Tabs>
                        </Page>
                        <Page>
                            <AddEvent
                                h2="Все ошибки"
                                type="mistakes"
                                data={commonData.errors}
                            />
                        </Page>
                    </aside>
                </section>
                <Button variant="primary" size="lg" block>
                    Завершить задачу
                </Button>
            </div>
        </Context.Provider>
    );
  }
}
