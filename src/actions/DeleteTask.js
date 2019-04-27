import {deleteTask} from "../api";

export default (text, updateState) => {
    deleteTask(text,(data) => {
        updateState({
            thisTask: {...data.thisTask, commonChecklist: this.state.commonData.checklist},
            commonData: data.commonData
        })
    })
};