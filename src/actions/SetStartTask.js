import {getData, updateThisData} from "../api";

let loaded = (updateState) => {
    setTimeout(() => {
        updateState({
            load: true
        })
    }, 500)
};

export default (thisTask, updateState) => {
    let taskName = localStorage.getItem('currentTask');

    if(taskName) {
        getData(taskName, (data) => {
            localStorage.setItem('currentTask', data.thisTask.h1);
            updateState({
                thisTask: data.thisTask,
                commonData: data.commonData
            });
            loaded(updateState)
        })
    } else {
        loaded(updateState)
    }

    window.onbeforeunload = () => {
        updateThisData(thisTask);
    }
}