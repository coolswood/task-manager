import {updateCommonData} from "../api";

export default (text, thisTask, commonData, updateState) => {
    let newChecklist = {...commonData.checklist, [text]: false};

    let data = {...commonData, checklist: newChecklist};

    updateCommonData(data);

    updateState({
        commonData: data,
        thisTask: {...thisTask, commonChecklist: {...thisTask.commonChecklist, [text]: false}}
    })
};