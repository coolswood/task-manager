const express = require('express');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');
const fs = require('fs');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

    jsonfile.readFile('./data/tasks.json', (err, data) => {

        sendData['task'] = data[name];

        jsonfile.readFile('./data/common.json', (err, data) => {
            sendData['common'] = data;
            return res.send(sendData)
        });
    });
});

app.post('/updateH1', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

    let newData = {};

    await jsonfile.readFile('./data/tasks.json', (err, data) => {
        let updatedData = {...data, [req.body.h1]: req.body};

        jsonfile.writeFile('./data/tasks.json', updatedData, 'utf8', () => {
            newData['task'] = req.body;
            return newData
        });
    });

    await jsonfile.readFile('./data/common.json', (err, data) => {
        let mass = [...data.commonData, req.body.h1];
        let updatedData = {...data, mass};

        jsonfile.writeFile('./data/common.json', updatedData, 'utf8', () => {
            newData['common'] = req.body;
            return newData
        });
    });

    return res.send(newData)
});

app.post('/newCommonData', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    jsonfile.writeFile('./data/common.json', req.body, 'utf8', () => {
        res.send(req.body)
    });
});

app.post('/newThisData', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

    jsonfile.readFile('./data/tasks.json', (err, data) => {
        let updatedData = {...data, [req.body.h1]: req.body};

        jsonfile.writeFile('./data/tasks.json', updatedData, 'utf8', () => {
            res.send(req.body)
        });
    });
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});