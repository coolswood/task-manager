import {updateH1} from "../api";

export default (text, thisTask, updateState) => {

    let oldText = thisTask.h1;

    let data = {...thisTask, h1: text};

    localStorage.setItem('currentTask', data.h1);

    updateH1(data, oldText,(data) => {
        updateState({
            thisTask: data.thisTask,
            commonData: data.commonData
        })
    });
};