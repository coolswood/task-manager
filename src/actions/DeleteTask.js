import {deleteTask} from "../api";

export default (text, updateState) => {
    deleteTask(text,(data) => {
        updateState({
            thisTask: data.thisTask,
            commonData: data.commonData
        })
    })
};