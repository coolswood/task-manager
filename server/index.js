const express = require('express');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');
const fs = require('fs');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const defaultThisTask = {
    h1: "Напишите название",
    thisErrorList: [],
    thisFindList: [],
    checklist: {},
    timer: 0
};

app.options('/*', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    res.send(req.body)
});

app.post('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

    const { name } = req.body;

    let sendData = {};

    jsonfile.readFile('./data/common.json', (err, data) => {

        if(!data || !data.tasks) {
            sendData = {
                "tasks": {"Напишите название": defaultThisTask},
                "commonData": {
                    "allHeaders": ["Напишите название"],
                    "checklist": {},
                    "errors": {}
                }
            };

            jsonfile.writeFile('./data/common.json', sendData, 'utf8', () => {
                return res.send({
                    thisTask: defaultThisTask,
                    commonData: {
                        allHeaders: ["Напишите название"],
                        checklist: {},
                        errors: {}
                    }
                })
            })
        } else {
            sendData = {...data, thisTask: data.tasks[name]};

            return res.send({ thisTask: data.tasks[name] || defaultThisTask, commonData: data.commonData })
        }
    });
});

app.post('/deleteTask', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

    let name = req.body.name;

    jsonfile.readFile('./data/common.json', (err, data) => {
        delete data.tasks[name];

        let allHeaders = data.commonData.allHeaders;
        let index = allHeaders.indexOf(name);

        allHeaders.splice(index, 1);

        jsonfile.writeFile('./data/common.json', data, 'utf8', () => {
            return res.send({ thisTask: defaultThisTask, commonData: data.commonData })
        })
    })
});

app.post('/deleteItemTask', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

    let name = req.body.name;
    let type = req.body.type;
    let h1 = req.body.h1;

    jsonfile.readFile('./data/common.json', (err, data) => {
        if(type === 'addMistake') {
            let thisErrorList = data.tasks[h1].thisErrorList;
            let index = thisErrorList.indexOf(name);

            thisErrorList.splice(index, 1);

            if(data.commonData.errors[name] === 1) {
                delete data.commonData.errors[name]
            } else {
                data.commonData.errors[name] = data.commonData.errors[name] - 1
            }
        }

        if(type === 'findMistake') {
            let thisFindList = data.tasks[h1].thisFindList;
            let index = thisFindList.indexOf(name);

            thisFindList.splice(index, 1);
        }

        if(type === 'localChecklist') {
            delete data.tasks[h1].checklist[name[1]];
        }

        if(type === 'commonChecklist') {
            delete data.commonData.checklist[name[1]];
        }

        jsonfile.writeFile('./data/common.json', data, 'utf8', () => {
            return res.send({ thisTask: data.tasks[h1], commonData: data.commonData })
        })
    })
});


app.post('/updateH1', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

    jsonfile.readFile('./data/common.json', (err, data) => {
        let save = {[req.body.newData.h1]: req.body.newData};

        delete data.tasks[req.body.oldText];

        // Список заголовков

        let allHeaders = data.commonData.allHeaders;
        let index = allHeaders.indexOf(req.body.oldText);

        if(index !== -1) {
            allHeaders.splice(index, 1, req.body.newData.h1)
        } else {
            allHeaders.push(req.body.newData.h1)
        }

        let updatedData = {...data, tasks: {...data.tasks, ...save}};

        jsonfile.writeFile('./data/common.json', updatedData, 'utf8', () => {
            return res.send({ thisTask: req.body.newData, commonData: data.commonData })
        })
    });
});

app.post('/newCommonData', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

    jsonfile.readFile('./data/common.json', (err, data) => {
        let newCommonData = {...data, commonData: req.body}

        jsonfile.writeFile('./data/common.json', newCommonData, 'utf8', () => {
            res.send(req.body)
        });
    })
});

app.post('/newThisData', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

    jsonfile.readFile('./data/common.json', (err, data) => {
        let newThisData = {...data, tasks: {...data.tasks, [req.body.h1]: req.body}};

        jsonfile.writeFile('./data/common.json', newThisData, () => {
            res.send(req.body)
        });
    });
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});