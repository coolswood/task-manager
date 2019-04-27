import {deleteItemTask} from "../api";

export default (text, type, thisTask, updateState) => {

    deleteItemTask(text, type, thisTask, (data) => {
        if(!data.commonData) {
            updateState({
                thisTask: data.thisTask
            })
        } else if(!data.thisTask) {
            updateState({
                commonData: data.commonData
            })
        } else {
            updateState({
                thisTask: data.thisTask,
                commonData: data.commonData
            })
        }
    })
};