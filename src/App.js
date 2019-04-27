import React, { Component } from 'react';

import { updateThisData } from './api'

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
import {COMMON_DATA, THIS_TASK} from "./constants/AppConstants";
import AddCommonChecklist from "./actions/AddCommonChecklist";
import ToggleChecklist from "./actions/ToggleChecklist";
import AddLocalChecklist from "./actions/AddLocalChecklist";
import AddNewFind from "./actions/AddNewFind";
import AddNewMistake from "./actions/AddNewMistake";
import ChangeH1 from "./actions/ChangeH1";
import DeleteItemTask from "./actions/DeleteItemTask";
import DeleteTask from "./actions/DeleteTask";
import ChangeTask from "./actions/ChangeTask";
import SetStartTask from "./actions/SetStartTask";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.inputName = React.createRef();
        this.inputLimit = React.createRef();
    }

    state = {
        thisTask: THIS_TASK,
        commonData: COMMON_DATA,
        load: false,
        popup: false
    };

    componentDidMount() {

        SetStartTask(this.state.thisTask, this.updateState)
    }

    updateTimer = (time) => {
        this.setState({
            thisTask: {...this.state.thisTask, timer: time}
        });

        updateThisData(this.state.thisTask);
    };

    openPopup = () => {
        this.setState({
            popup: !this.state.popup
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
            popup: false
        });

        setTimeout(() => {
            ChangeH1(value, this.state.thisTask, this.updateState)
        }, 0);

        this.inputName.current.value = '';
        this.inputLimit.current.value = '';

    };

    updateState = (data) => {
      this.setState(data)
    };

    render() {
        const { thisTask, commonData, popup } = this.state;

        return (
            <Context.Provider value = {{
                ...this.state,
                addNewMistake: (text) => AddNewMistake(text, thisTask, commonData, this.updateState),
                addNewFind: (text) => AddNewFind(text, thisTask, commonData, this.updateState),
                addLocalChecklist: (text) => AddLocalChecklist(text, thisTask, this.updateState),
                addCommonChecklist: (text) => AddCommonChecklist(text, thisTask, commonData, this.updateState),
                toggleChecklist: (text, id) => ToggleChecklist(text, id, thisTask, this.updateState),
                changeH1: (text) => ChangeH1(text, thisTask, this.updateState),
                openPopup: this.openPopup,
                changeTask: (text) => ChangeTask(text, thisTask, this.updateState),
                deleteTask: (text) => DeleteTask(text, this.updateState),
                deleteItemTask: (text, type) => DeleteItemTask(text, type, thisTask, this.updateState),
                updateTimer: this.updateTimer
            }}>
                <div className="background" />
                <div className="app">
                    <Gists syncData={this.updateState} />
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

                    {popup && <div className="popup-task__closer" onClick={this.openPopup} />}
                    <Page className={`popup-task ${popup ? 'popup-task__opened' : ''}`}>
                        <h2>Создать задачу</h2>
                        <form className="form popup-task__form" onSubmit={this.createNewTask}>
                            <div className="popup-task__wrap">
                                <input ref={this.inputName} type="text" placeholder="Введите название" />
                                <input ref={this.inputLimit} type="text" placeholder="Предположительное время на задачу в часах" />
                            </div>

                            <Ripple>
                                { (ripples) => (
                                    <button className="ordinar"
                                            type="submit"
                                            variant="outline-primary"
                                            style={{ position: 'relative' }}>
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