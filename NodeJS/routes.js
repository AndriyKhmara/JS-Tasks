/**
 * Created by ASU on 16.06.2016.
 */
'use strict';
var app = require('./app');
var indexPage = require('./postRequest.js');

app.get('/', function (req, res) {
    //res.send(indexPage.getPage());
    res.render('pages/index');
});