import React, { Component } from 'react';

import { getData, updateCommonData, updateThisData, updateH1, changeTask, deleteTask } from './api'

import Page from './UI/Page'

import { Tabs, Tab, Button } from 'react-bootstrap';

import AddEvent from './components/AddEvent'
import Header from './components/Header'
import Nav from './components/Nav'

import {Context} from './context';

export default class App extends Component {
    state = {
        thisTask: {
            h1: "Напишите название",
            thisErrorList: [],
            thisFindList: [],
            checklist: {}
        },
        commonData: {
            allHeaders: [],
            checklist: {},
            errors: {}
        }
    };

    componentDidMount() {

        let taskName = localStorage.getItem('currentTask');

        if(taskName) {
            getData(taskName).then((data) => {
                localStorage.setItem('currentTask', this.state.thisTask.h1);
                this.setState({
                    thisTask: data.thisTask,
                    commonData: data.commonData
                })
            });
        }
    }

    changeTask = (text) => {
        changeTask(text).then((data) => {
            localStorage.setItem('currentTask', text);

            this.setState({
                thisTask: data.thisTask,
                commonData: data.commonData
            })
        });
    };

    deleteTask = (text) => {
        deleteTask(text).then((data) => {
            this.setState({
                thisTask: data.thisTask,
                commonData: data.commonData
            })
        })
    };

    changeH1 = (text) => {
        const { thisTask } = this.state;
        let oldText = thisTask.h1;

        let data = {...thisTask, h1: text};

        localStorage.setItem('currentTask', data.h1);

        updateH1(data, oldText).then((data) => {
            console.log(data.thisTask, data.commonData)
            this.setState({
                thisTask: data.thisTask,
                commonData: data.commonData
            })
        });
    };

    createNewTask = () => {
        this.setState({
            thisTask: {
                h1: "Напишите название",
                thisErrorList: [],
                thisFindList: [],
                checklist: {}
            }
        })
    };

    addNewMistake = (text) => {
        const { thisTask, commonData } = this.state;

        // Добавить ошибку
        let data = {...thisTask, thisErrorList: [...thisTask.thisErrorList, text]};

        updateThisData(data);

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

            newDate = {...commonData, errors: mewObj}
        }

        updateCommonData(newDate);

        this.setState({
            thisTask: data,
            commonData: newDate
        })
    };

    addNewFind = (text) => {
        const { thisTask } = this.state;

        let data = {...thisTask, thisFindList: [...thisTask.thisFindList, text]};

        updateThisData(data);

        this.setState({
            thisTask: data
        })
    };

    addLocalChecklist = (text) => {
        const { thisTask } = this.state;

        let data = {...thisTask, checklist: {...thisTask.checklist, [text]: false}};

        updateThisData(data);

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

            updateThisData(data);

            this.setState({
                thisTask: data
            })
        } else {
            let toggled = commonData.checklist;
            toggled[text] = !toggled[text];

            data = {...commonData, toggled};

            updateCommonData(data);

            this.setState({
                commonData: data
            })
        }
    };

    addCommonChecklist = (text) => {
        const { commonData } = this.state;

        let data = {...commonData, checklist: {...commonData.checklist, [text]: false}};

        updateCommonData(data);

        this.setState({
            commonData: data
        })
    };

    render() {
        const { thisTask, commonData } = this.state;

        return (
            <Context.Provider value = {{
                ...this.state,
                addNewMistake: this.addNewMistake,
                addNewFind: this.addNewFind,
                addLocalChecklist: this.addLocalChecklist,
                addCommonChecklist: this.addCommonChecklist,
                toggleChecklist: this.toggleChecklist,
                changeH1: this.changeH1,
                createNewTask: this.createNewTask,
                changeTask: this.changeTask,
                deleteTask: this.deleteTask
            }}>
                <div className="background" />
                <div className="app">
                    <Nav headers={commonData.allHeaders} />
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
                                <Tabs defaultActiveKey="thisChecklist">
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