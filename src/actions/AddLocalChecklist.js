import {updateThisData} from "../api";

export default (text, thisTask, updateState) => {

    let data = {...thisTask, checklist: {...thisTask.checklist, [text]: false}};

    updateThisData(data);

    updateState({
        thisTask: data
    })
};