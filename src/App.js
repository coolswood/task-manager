import React, { Component } from 'react';

import { getData, updateCommonData, updateThisData, updateH1, changeTask, deleteTask, deleteItemTask } from './api'

import Page from './UI/Page'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Ripple from '@intereact/ripple';
import Gists from './UI/Gists';
import TimerComponent from './UI/Timer';
import "react-tabs/style/react-tabs.css";
import { CSSTransition } from 'react-transition-group';

import AddEvent from './components/AddEvent'
import Header from './components/Header'
import Nav from './components/Nav'

import {Context} from './context';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.inputName = React.createRef();
        this.inputLimit = React.createRef();
    }

    state = {
        thisTask: {
            h1: "Напишите название",
            thisErrorList: [],
            thisFindList: [],
            checklist: {},
            commonChecklist: {},
            timer: 0,
            limit: 0
        },
        commonData: {
            allHeaders: [],
            checklist: {},
            errors: {}
        },
        load: false,
        popap: false
    };

    componentDidMount() {

        let taskName = localStorage.getItem('currentTask');

        if(taskName) {
            getData(taskName, (data) => {
                localStorage.setItem('currentTask', data.thisTask.h1);
                this.setState({
                    thisTask: data.thisTask,
                    commonData: data.commonData
                });
                setTimeout(() => {
                    this.setState({
                        load: true
                    })
                }, 500)
            })
        } else {
            setTimeout(() => {
                this.setState({
                    load: true
                })
            }, 500)
        }

        window.onbeforeunload = () => {
            updateThisData(this.state.thisTask);
        }
    }

    changeTask = (text) => {
        updateThisData(this.state.thisTask);

        changeTask(text, (data) => {
            localStorage.setItem('currentTask', text);
            this.setState({
                thisTask: data.thisTask,
                commonData: data.commonData
            })
        });
    };

    updateTimer = (time) => {
        this.setState({
            thisTask: {...this.state.thisTask, timer: time}
        });

        updateThisData(this.state.thisTask);
    };

    deleteTask = (text) => {
        deleteTask(text,(data) => {
            this.setState({
                thisTask: {...data.thisTask, commonChecklist: this.state.commonData.checklist},
                commonData: data.commonData
            })
        })
    };

    deleteItemTask = (text, type) => {
        const { thisTask } = this.state;

        deleteItemTask(text, type, thisTask, (data) => {
            if(!data.commonData) {
                this.setState({
                    thisTask: data.thisTask
                })
            } else if(!data.thisTask) {
                this.setState({
                    commonData: data.commonData
                })
            } else {
                this.setState({
                    thisTask: data.thisTask,
                    commonData: data.commonData
                })
            }
        })
    };

    changeH1 = (text) => {
        const { thisTask } = this.state;
        let oldText = thisTask.h1;

        let data = {...thisTask, h1: text};

        localStorage.setItem('currentTask', data.h1);

        updateH1(data, oldText,(data) => {
            this.setState({
                thisTask: data.thisTask,
                commonData: data.commonData
            })
        });
    };

    openPopap = () => {
        this.setState({
            popap: !this.state.popap
        })
    };

    createNewTask = (e) => {
        e.preventDefault();
        let value = this.inputName.current.value === '' ? 'Напишите название' : this.inputName.current.value;
        let valueLimit = this.inputLimit.current.value === '' ? 0 : this.inputLimit.current.value * 60 * 60 * 1000;

        this.setState({
            thisTask: {
                h1: value,
                thisErrorList: [],
                thisFindList: [],
                commonChecklist: this.state.commonData.checklist,
                checklist: {},
                limit: valueLimit
            },
            popap: false
        })

        setTimeout(() => {
            this.changeH1(value);
        }, 0);

        this.inputName.current.value = '';
        this.inputLimit.current.value = '';

    };

    syncData = (data) => {
        this.setState({
            thisTask: data.thisTask,
            commonData: data.commonData
        })
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

            newDate = {...commonData, errors: mewObj}
        }

        updateThisData(data);
        updateCommonData(newDate);

        this.setState({
            thisTask: data,
            commonData: newDate
        })
    };

    addNewFind = (text) => {
        const { thisTask, commonData } = this.state;

        let data = {...thisTask, thisFindList: [...thisTask.thisFindList, text]};

        let newDate;

        if(commonData.errors[text]) {
            if(commonData.errors[text] === 1) {
                delete commonData.errors[text]
                newDate = commonData;
            } else {
                let errors = {...commonData.errors, [text]: commonData.errors[text] - 1};
                let sorted = Object.keys(errors).sort(function (a, b) {
                    return errors[b] - errors[a]
                });

                let mewObj = {};
                sorted.map((item) => {
                    mewObj[item] = errors[item]
                });

                newDate = {...commonData, errors: mewObj}
            }

            updateCommonData(newDate);

            this.setState({
                commonData: newDate
            })
        }

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
        const { thisTask } = this.state;

        let toggled;

        if(id === 'localChecklist') {
            toggled = thisTask.checklist;
        } else {
            toggled = thisTask.commonChecklist;
        }

        toggled[text] = !toggled[text];

        let data;

        if(id === 'localChecklist') {
            data = {...thisTask, checklist: toggled};
        } else {
            data = {...thisTask, commonChecklist: toggled};
        }

        updateThisData(data);

        this.setState({
            thisTask: data
        })
    };

    addCommonChecklist = (text) => {
        const { thisTask, commonData } = this.state;
        let newChecklist = {...commonData.checklist, [text]: false};

        let data = {...commonData, checklist: newChecklist};

        updateCommonData(data);

        this.setState({
            commonData: data,
            thisTask: {...thisTask, commonChecklist: {...thisTask.commonChecklist, [text]: false}}
        })
    };

    render() {
        const { thisTask, commonData, popap } = this.state;

        return (
            <Context.Provider value = {{
                ...this.state,
                addNewMistake: this.addNewMistake,
                addNewFind: this.addNewFind,
                addLocalChecklist: this.addLocalChecklist,
                addCommonChecklist: this.addCommonChecklist,
                toggleChecklist: this.toggleChecklist,
                changeH1: this.changeH1,
                openPopap: this.openPopap,
                changeTask: this.changeTask,
                deleteTask: this.deleteTask,
                deleteItemTask: this.deleteItemTask,
                updateTimer: this.updateTimer
            }}>
                <div className="background" />
                <div className="app">
                    <Gists syncData={this.syncData} />
                    <CSSTransition
                        in={this.state.load}
                        timeout={700}
                        classNames="load"
                        unmountOnExit
                    >
                        <div className="wrapper">
                            <Nav headers={commonData.allHeaders} />
                            <Header />
                            <section className="main-wrapper">
                                <main>
                                    <Page style={{position: 'relative'}} className="timer-wrap">
                                        <div className="timer">
                                            <TimerComponent limit={thisTask.limit} />
                                        </div>
                                    </Page>
                                    <Page>
                                        <AddEvent
                                            h2="Все ошибки"
                                            type="mistakes"
                                            data={commonData.errors}
                                        />
                                    </Page>
                                </main>
                                <aside>
                                    <Page className="no-padding">
                                        <Tabs>
                                            <TabList>
                                                <Tab>Чеклист задачи</Tab>
                                                <Tab>Чеклист</Tab>
                                            </TabList>
                                            <TabPanel>
                                                <AddEvent
                                                    h2=""
                                                    type="checklist"
                                                    id="localChecklist"
                                                    data={thisTask.checklist}
                                                />
                                            </TabPanel>
                                            <TabPanel>
                                                <AddEvent
                                                    h2=""
                                                    type="checklist"
                                                    id="commonChecklist"
                                                    data={thisTask.commonChecklist}
                                                />
                                            </TabPanel>
                                        </Tabs>
                                    </Page>
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
                                </aside>
                            </section>
                        </div>
                    </CSSTransition>

                    {popap && <div className="popap-task__closer" onClick={this.openPopap}></div>}
                    <Page className={`popap-task ${popap ? 'popap-task__opened' : ''}`}>
                        <h2>Создать задачу</h2>
                        <form className="form popap-task__form" onSubmit={this.createNewTask}>
                            <div className="popap-task__wrap">
                                <input ref={this.inputName} type="text" placeholder="Введите название" />
                                <input ref={this.inputLimit} type="text" placeholder="Предположительное время на задачу в часах" />
                            </div>

                            <Ripple>
                                { (ripples) => (
                                    <button className="ordinar" type="submit" variant="outline-primary" style={{ position: 'relative' }}>
                                        Создать
                                        { ripples }
                                    </button>
                                ) }
                            </Ripple>
                        </form>
                    </Page>

                </div>
            </Context.Provider>
        );
    }
}