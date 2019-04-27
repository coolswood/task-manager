import {updateCommonData, updateThisData} from "../api";

export default (text, thisTask, commonData, updateState) => {

    let data = {...thisTask, thisFindList: [...thisTask.thisFindList, text]};

    let newDate;

    if(commonData.errors[text]) {
        if(commonData.errors[text] === 1) {
            delete commonData.errors[text];
            newDate = commonData;
        } else {
            let errors = {...commonData.errors, [text]: commonData.errors[text] - 1};
            let sorted = Object.keys(errors).sort(function (a, b) {
                return errors[b] - errors[a]
            });

            let mewObj = {};
            sorted.map((item) => (
                mewObj[item] = errors[item]
            ));

            newDate = {...commonData, errors: mewObj}
        }

        updateCommonData(newDate);

        updateState({
            commonData: newDate
        })
    }

    updateThisData(data);

    updateState({
        thisTask: data
    })
};