import React, { Component, Fragment } from 'react';

import Page from './UI/Page'

import { Tabs, Tab, Button } from 'react-bootstrap';

import AddEvent from './components/AddEvent'
import Header from './components/Header'
import Nav from './components/Nav'

import {Context} from './context';

export default class App extends Component {
    state = {
        allHeaders: [
            "Заголовок задачи",
            "Заголовок задачи",
            "Заголовок задачи",
            "Заголовок задачи"
        ],
        thisTask: {
            h1: "Заголовок задачи",
            thisErrorList: [],
            thisFindList: [],
            checklist: {}
        },
        commonData: {
            checklist: {},
            errors: {}
        }
    };

    addNewMistake = (text) => {
        const { thisTask, commonData } = this.state;

        // Добавить ошибку
        let data = {...thisTask, thisErrorList: [...thisTask.thisErrorList, text]};

        // Добавить общую ошибку

        let newDate = {};

        if(!commonData.errors[text]) {
            let data = {...commonData.errors, [text]: 1};
            newDate = {...commonData, errors: data}
        } else {
            let data = {...commonData.errors, [text]: commonData.errors[text] + 1};
            let sorted = Object.keys(data).sort(function (a, b) {
                return data[b] - data[a]
            });

            let mewObj = {};
            sorted.map((item) => {
                mewObj[item] = data[item]
            });
            console.log(mewObj)
            newDate = {...commonData, errors: mewObj}
        }

        this.setState({
            thisTask: data,
            commonData: newDate
        })
    };

    addNewFind = (text) => {
        const { thisTask } = this.state;

        let data = {...thisTask, thisFindList: [...thisTask.thisFindList, text]};

        this.setState({
            thisTask: data
        })
    };

    addLocalChecklist = (text) => {
        const { thisTask } = this.state;

        let data = {...thisTask, checklist: {...thisTask.checklist, [text]: false}};

        this.setState({
            thisTask: data
        })
    };

    toggleChecklist = (text, id) => {
        const { thisTask, commonData } = this.state;

        let data = {};

        if(id === 'localChecklist') {
            let toggled = thisTask.checklist;
            toggled[text] = !toggled[text];

            data = {...thisTask, toggled};

            this.setState({
                thisTask: data
            })
        } else {
            let toggled = commonData.checklist;
            toggled[text] = !toggled[text];

            data = {...commonData, toggled};

            this.setState({
                commonData: data
            })
        }
    };

    addCommonChecklist = (text) => {
        const { commonData } = this.state;

        let data = {...commonData, checklist: {...commonData.checklist, [text]: false}};

        this.setState({
            commonData: data
        })
    };

  render() {
      const { thisTask, commonData, allHeaders } = this.state;

    return (
        <Context.Provider value = {{
            ...this.state,
            addNewMistake: this.addNewMistake,
            addNewFind: this.addNewFind,
            addLocalChecklist: this.addLocalChecklist,
            addCommonChecklist: this.addCommonChecklist,
            toggleChecklist: this.toggleChecklist
        }}>
            <div className="background" />
            <div className="app">
                <Nav headers={allHeaders} />
                <Header />
                <section>
                    <main>
                        <Page>
                            <AddEvent
                                h2="Добавить ошибку"
                                type='ordinar'
                                id="addMistake"
                                color={'error'}
                                data={thisTask.thisErrorList}
                            />
                        </Page>
                        <Page>
                            <AddEvent
                                h2="Нашел ошибку"
                                type='ordinar'
                                id="findMistake"
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
                                        id="localChecklist"
                                        data={thisTask.checklist}
                                    />
                                </Tab>
                                <Tab eventKey="checklist" title="checklist">
                                    <AddEvent
                                        h2="Checklist"
                                        type="checklist"
                                        id="commonChecklist"
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
