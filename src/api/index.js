let db;

let newThisItem = {
    h1: "Напишите название",
    thisErrorList: [],
    thisFindList: [],
    checklist: {},
    commonChecklist: {},
    timer: 0
};

let DBOpenRequest = window.indexedDB.open("taskList", 1);

DBOpenRequest.onupgradeneeded = function(event) {
    let db = event.target.result;

    let thisTask = db.createObjectStore("thisTask", { keyPath: "h1", autoIncrement: true });

    thisTask.put(newThisItem);

    let commonData = db.createObjectStore("commonData", { keyPath: "commonData", autoIncrement: true });

    let newCommonItem = {
        allHeaders: ["Напишите название"],
        checklist: {},
        errors: {}
    };

    commonData.put(newCommonItem)
};

export const getAllData = (callback) => {
    let objectStore = db.transaction(["commonData"], "readwrite").objectStore('commonData');

    objectStore.openCursor().onsuccess = (e) => {
        let cursor = e.target.result.value;

        let thisStore = db.transaction(["thisTask"], "readwrite").objectStore('thisTask');
        let thisTasks = [];

        thisStore.openCursor().onsuccess = (event) => {
            let thisCursor = event.target.result;

            if(thisCursor) {
                thisTasks.push(thisCursor.value);

                thisCursor.continue();
            } else {
                callback({thisTasks: thisTasks, commonData: cursor, currentTask: localStorage.getItem('currentTask')})
            }
        };
    };
};

export const syncData = (data, callback) => {
    let objectStore = db.transaction(["commonData"], "readwrite").objectStore('commonData');

    objectStore.clear();
    objectStore.put(data.commonData);

    let transaction = db.transaction(["thisTask"], "readwrite").objectStore("thisTask");

    transaction.clear();
    data.thisTasks.map(item => {
        transaction.put(item);
    });

    localStorage.setItem('currentTask', data.currentTask);

    let thisTask = data.thisTasks.filter(item => {
        return item.h1 === data.currentTask
    })[0];

    callback({commonData: data.commonData, thisTask: thisTask})

    // objectStore.clear()
};

export const getData = (taskName, callback) => {

    DBOpenRequest.onsuccess = (event) => {
        db = event.target.result;

        let objectStore = db.transaction(["thisTask"]).objectStore('thisTask').get(taskName);

        objectStore.onsuccess = (event) => {
            let objectStore = db.transaction(["commonData"]).objectStore('commonData');
            objectStore.openCursor().onsuccess = function (e) {
                let cursor = e.target.result;

                if(!event.target.result) {
                    callback({thisTask: {...newThisItem, commonChecklist: cursor.value.checklist}, commonData: cursor.value})
                } else {
                    callback({thisTask: {...event.target.result, commonChecklist: {...cursor.value.checklist, ...event.target.result.commonChecklist}}, commonData: cursor.value})
                }
            };
        };
    };
};

export const updateCommonData = (data) => {
    let transaction = db.transaction(["commonData"], "readwrite").objectStore("commonData");

    transaction.put(data);
};

export const updateThisData = (data) => {

    let transaction = db.transaction(["thisTask"], "readwrite").objectStore("thisTask");

    transaction.put(data);
};

export const updateH1 = (data, oldText, callback) => {
    let objectStore = db.transaction(["commonData"], "readwrite").objectStore('commonData');

    objectStore.openCursor().onsuccess = (e) => {
        let cursor = e.target.result;

        let allHeaders = cursor.value.allHeaders;

        let index = allHeaders.indexOf(oldText);

        if(index !== -1) {
            allHeaders.splice(index, 1, data.h1)
        } else {
            allHeaders.push(data.h1)
        }

        objectStore.put({...cursor.value, allHeaders: allHeaders});

        let thisStore = db.transaction(["thisTask"], "readwrite").objectStore('thisTask');

        thisStore.delete(oldText);
        thisStore.put(data);

        callback({thisTask: data, commonData: cursor.value})
    };
};

export const changeTask = (taskName, callback) => {
    let objectStore = db.transaction(["thisTask"]).objectStore('thisTask').get(taskName);

    objectStore.onsuccess = (event) => {
        let objectStore = db.transaction(["commonData"]).objectStore('commonData');
        objectStore.openCursor().onsuccess = function (e) {
            let cursor = e.target.result;

            callback({thisTask: {...event.target.result, commonChecklist: {...cursor.value.checklist, ...event.target.result.commonChecklist}}, commonData: cursor.value})
        };
    };
};

export const deleteTask = (taskName, callback) => {
    let objectStore = db.transaction(["thisTask"], "readwrite").objectStore('thisTask');

    objectStore.openCursor().onsuccess = (event) => {
        objectStore.delete(taskName);

        let common = db.transaction(["commonData"], "readwrite").objectStore('commonData');
        common.openCursor().onsuccess = function (e) {
            let cursor = e.target.result;

            let allHeaders = cursor.value.allHeaders;

            let index = allHeaders.indexOf(taskName);

            allHeaders.splice(index, 1);

            common.put({...cursor.value, allHeaders: allHeaders});

            callback({thisTask: newThisItem, commonData: {...cursor.value, allHeaders: allHeaders}})
        };
    };
};

export const deleteItemTask = (text, type, thisTask, callback) => {
    let objectStore = db.transaction(["thisTask"], "readwrite").objectStore('thisTask');

    if(type === 'addMistake') {
        objectStore.openCursor().onsuccess = () => {

            let thisErrorList = thisTask.thisErrorList;
            let index = thisErrorList.indexOf(text);

            thisErrorList.splice(index, 1);

            let thisTaskUp = {...thisTask, thisErrorList: thisErrorList}

            objectStore.put(thisTaskUp);

            let common = db.transaction(["commonData"], "readwrite").objectStore('commonData');

            common.openCursor().onsuccess = (event) => {
                let cursor = event.target.result.value;
                if(cursor.errors[text]) {
                    if(cursor.errors[text] === 1) {
                        delete cursor.errors[text]
                    } else {
                        cursor.errors[text] = cursor.errors[text] - 1
                    }
                }

                common.put(cursor);

                callback({thisTask: thisTaskUp, commonData: cursor})
            }
        }
    };

    if(type === 'findMistake') {
        objectStore.openCursor().onsuccess = () => {
            let thisFindList = thisTask.thisFindList;
            let index = thisFindList.indexOf(text);

            thisFindList.splice(index, 1);
            objectStore.put({...thisTask, thisFindList: thisFindList});

            callback({thisTask: {...thisTask, thisFindList: thisFindList}})
        }
    }

    if(type === 'localChecklist') {
        objectStore.openCursor().onsuccess = () => {
            delete thisTask.checklist[text[1]];
            objectStore.put(thisTask);

            callback({thisTask: thisTask})
        }
    }

    if(type === 'commonChecklist') {
        let common = db.transaction(["commonData"], "readwrite").objectStore('commonData');

        common.openCursor().onsuccess = (event) => {
            let cursor = event.target.result.value;
            delete cursor.checklist[text[1]];
            delete thisTask.commonChecklist[text[1]];

            common.put(cursor);

            callback({thisTask: {...thisTask, commonChecklist: {...thisTask.commonChecklist, ...cursor.commonChecklist}}, commonData: cursor})
        }
    }

};