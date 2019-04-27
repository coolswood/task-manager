import React, { Component } from 'react';
import Page from "../../App";

export default class App extends Component {
    render() {
        return (
            <>
                {popup && <div className="popup-task__closer" onClick={this.openPopup}></div>}
                <Page className={`popup-task ${popup ? 'popup-task__opened' : ''}`}>
                    <h2>Создать задачу</h2>
                    <form className="form popup-task__form" onSubmit={this.createNewTask}>
                        <div className="popup-task__wrap">
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
            </>
        )
    }
}