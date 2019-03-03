
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

const express = require('express');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');
let apps = express();

apps.use(bodyParser.json());
apps.use(bodyParser.urlencoded({ extended: true }));

function createWindow() {
    mainWindow = new BrowserWindow({width: 1400, height: 880});
    mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
    mainWindow.on('closed', () => mainWindow = null);

    var way = app.getPath('downloads');

    const defaultThisTask = {
        h1: "Напишите название",
        thisErrorList: [],
        thisFindList: [],
        checklist: {}
    };

    apps.options('/*', function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        res.send(req.body)
    });

    apps.post('/', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

        const { name } = req.body;

        let sendData = {};

        jsonfile.readFile(`${way}\\downloads`, (err, data) => {

            if(!data || !data.tasks) {
                sendData = {
                    "tasks": {"Напишите название": {
                            "h1": "Напишите название",
                            "thisErrorList": [],
                            "thisFindList": [],
                            "checklist": {}
                        }},
                    "commonData": {
                        "allHeaders": ["Напишите название"],
                        "checklist": {},
                        "errors": {}
                    }
                };

                jsonfile.writeFile(`${way}\\downloads`, sendData, 'utf8', () => {
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

    apps.post('/deleteTask', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

        let name = req.body.name;

        jsonfile.readFile(`${way}\\downloads`, (err, data) => {
            delete data.tasks[name];

            let allHeaders = data.commonData.allHeaders;
            let index = allHeaders.indexOf(name);

            allHeaders.splice(index, 1)

            jsonfile.writeFile(`${way}\\downloads`, data, 'utf8', () => {
                return res.send({ thisTask: defaultThisTask, commonData: data.commonData })
            })
        })
    });

    apps.post('/deleteItemTask', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

        let name = req.body.name;
        let type = req.body.type;
        let h1 = req.body.h1;

        jsonfile.readFile(`${way}\\downloads`, (err, data) => {
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

            jsonfile.writeFile(`${way}\\downloads`, data, 'utf8', () => {
                return res.send({ thisTask: data.tasks[h1], commonData: data.commonData })
            })
        })
    });


    apps.post('/updateH1', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

        jsonfile.readFile(`${way}\\downloads`, (err, data) => {
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

            jsonfile.writeFile(`${way}\\downloads`, updatedData, 'utf8', () => {
                return res.send({ thisTask: req.body.newData, commonData: data.commonData })
            })
        });
    });

    apps.post('/newCommonData', function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

        jsonfile.readFile(`${way}\\downloads`, (err, data) => {
            let newCommonData = {...data, commonData: req.body}

            jsonfile.writeFile(`${way}\\downloads`, newCommonData, 'utf8', () => {
                res.send(req.body)
            });
        })
    });

    apps.post('/newThisData', function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

        jsonfile.readFile(`${way}\\downloads`, (err, data) => {
            let newThisData = {...data, tasks: {...data.tasks, [req.body.h1]: req.body}};

            jsonfile.writeFile(`${way}\\downloads`, newThisData, () => {
                res.send(req.body)
            });
        });
    });

    apps.listen(8080, function () {
        console.log('Example app listening on port 8080!');
    });

}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});