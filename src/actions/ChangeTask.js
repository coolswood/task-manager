import {changeTask, updateThisData} from "../api";

export default (text, thisTask, updateState) => {
    updateThisData(thisTask);

    changeTask(text, (data) => {
        localStorage.setItem('currentTask', text);
        updateState({
            thisTask: data.thisTask,
            commonData: data.commonData
        })
    });
};