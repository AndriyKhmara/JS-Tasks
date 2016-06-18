/**
 * Created by ASU on 16.06.2016.
 */
'use strict';
var http = require('http');

var app = require('./app');

var port = app.get('port');

require('./routes');

http.createServer(app).listen(port, function () {
    console.log("Our web site: http://localhost:" + port);
})