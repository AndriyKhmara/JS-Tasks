/**
 * Created by Andriy.Khmara on 14.06.2016.
 */
var express = require('express');
var bodyParser = require("body-parser");
var stylus = require('stylus');
var indexPage = require('./postRequest.js')


var app = module.exports = exports = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);
app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static('./public'));

app.use(stylus.middleware({
    src: './public',
    compress:true
}));
/*Added post page*/
app.get('/post', function (req, res) {
    res.send(indexPage.getPage());
});
app.post('/post', function (req, res) {
    res.send(indexPage.getPage(req.body));
});

