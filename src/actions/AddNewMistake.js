import {updateCommonData, updateThisData} from "../api";

export default (text, thisTask, commonData, updateState) => {

    // Добавить ошибку
    let data = {...thisTask, thisErrorList: [...thisTask.thisErrorList, text]};

    // Добавить общую ошибку

    let newDate = {};

    if(!commonData.errors[text]) {
        let data = {...commonData.errors, [text]: 1};
        newDate = {...commonData, errors: data}
    } else {
        let data = {...commonData.errors, [text]: commonData.errors[text] + 1};
        let sorted = Object.keys(data).sort(function (a, b) {
            return data[b] - data[a]
        });

        let mewObj = {};
        sorted.map((item) => (
            mewObj[item] = data[item]
        ));

        newDate = {...commonData, errors: mewObj}
    }

    updateThisData(data);
    updateCommonData(newDate);

    updateState({
        thisTask: data,
        commonData: newDate
    })
};