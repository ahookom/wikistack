'use strict';
var express = require('express');
var app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var router = require('./routes');
// var fs = require('fs');
var path = require('path');
// var mime = require('mime');
var bodyParser = require('body-parser');
// var socketio = require('socket.io');
var models = require('./models');

app.use(morgan('tiny'));

app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
var env = nunjucks.configure('views', { noCache: true }); // where to find the views, caching off
models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(1337, function () {
        console.log('Server is listening on port 1337!');
    });
})
.catch(console.error);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/public')));

app.use('/',router);

app.use(function(err,req,res,next){
  // if(err){
  //   res.render(500,'There was an internal error.');
  // }
  res.send('try again');
});
