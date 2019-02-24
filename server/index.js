const express = require('express');
const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');
const fs = require('fs');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/newCommonData', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    // fs.writeFile('common.json', json, 'utf8', callback);
    console.log(req.body)
});

app.use('/', proxy('http://localhost:3000/'));

app.listen(9000, function () {
    console.log('Example app listening on port 9000!');
});