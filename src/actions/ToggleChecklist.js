import {updateThisData} from "../api";

export default (text, id, thisTask, updateState) => {
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

    updateState({
        thisTask: data
    })
};