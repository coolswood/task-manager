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
            thisErrorList: [],
            thisFindList: [],
            checklist: [
                {name: 'Задача', checked: true},
                {name: 'Задача', checked: true},
                {name: 'Задача', checked: false}
            ]
        },
        commonData: {
            checklist: [
                {name: 'Задача', checked: true},
                {name: 'Задача', checked: true},
                {name: 'Задача', checked: false}
            ],
            errors: [
                {name: 'Ошибка', cnt: 1},
                {name: 'Ошибка', cnt: 10},
                {name: 'Ошибка', cnt: 5}
            ]
        }
    };

    addNewMistake = (text) => {
        const { thisTask, commonData } = this.state;

        // Добавить ошибку
        let data = {...thisTask, thisErrorList: [...thisTask.thisErrorList, text]};

        // Добавить общую ошибку

        let newErrors = {};

        commonData.errors.map((item, id) => {
            if(text === item.name) {
                let itemError = commonData.errors;
                itemError[id].cnt ++;
                newErrors = {...commonData, errors: itemError}
            }
            else {
                newErrors = {...commonData, errors: [...commonData.errors, {name: text, cnt: 1}]}
            }
        });

        this.setState({
            thisTask: data,
            commonData: newErrors
        })
    };

    addNewFind = (text) => {
        const { thisTask } = this.state;

        let data = {...thisTask, thisFindList: [...thisTask.thisFindList, text]};

        this.setState({
            thisTask: data
        })
    }

  render() {
      const { thisTask, commonData } = this.state;

    return (
        <Context.Provider value = {{
            ...this.state,
            addNewMistake: this.addNewMistake,
            addNewFind: this.addNewFind
        }}>
            <div className="background" />
            <div className="app">
                <Header />
                <section>
                    <main>
                        <Page>
                            <AddEvent
                                h2="Добавить ошибку"
                                type='ordinar'
                                color={'error'}
                                data={thisTask.thisErrorList}
                            />
                        </Page>
                        <Page>
                            <AddEvent
                                h2="Нашел ошибку"
                                type='ordinarFind'
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
