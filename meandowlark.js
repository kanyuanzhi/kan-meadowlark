"use strict";
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Parse = require('parse/node');
Parse.initialize("kanyuanzhi");
Parse.serverURL = 'http://localhost:4040/parse1';

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(function (req, res, next) {
    res.locals.showTests = app.get('env') !== 'production'&&req.query.test ==='1';
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


var ranStr = require('./lib/randomstr');
app.get('/', function (req, res) {
    res.render('home',{
        str:ranStr.getRanStr(),
        pageTestScript:''
    });
});

app.get('/about', function (req, res) {
    res.render('about',{
        pageTestScript:'/qa/tests-about.js'
    });
});
app.get('/thank-you', function (req, res) {
    res.render('303',{
        pageTestScript:''
    });
});

/*
app.get('/headers',function (req, res) {
    res.set('Content-Type','text/plain');
    var s = '';
    for (var name in req.headers){
        s+=name+':'+req.headers(name)+'\n';
    }
    res.send(s);
    console.log(req.headers);
});
*/

app.get('/newsletter',function (req, res) {
    res.render('newsletter',{csrf:'CSRF token goes here'})
});
app.post('/process',function (req, res) {
    if (req.xhr || req.accepts('json,html')==='json'){
        console.log(req.query.form);
        console.log(req.body._csrf);
        console.log(req.body.name);
        console.log(req.body.birthday);
        var str =req.body.birthday;
        var date = new Date(str);
        console.log(date);
        console.log(Date.parse(date));
        var UserInfo = Parse.Object.extend("UserInfo");
        var userInfo = new UserInfo();
        userInfo.save({
            name: req.body.name,
            birthday: date,
            cheatMode: false
        }, {
            success: function(userInfo) {
                console.log(userInfo);
            },
            error: function(userInfo, error) {
                console.log(error)
            }
        });
        res.send({success:true});
    }else {
        res.redirect(303,'/thank-you')
    }
})

app.use(express.static(path.join(__dirname,'/public')));

app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port'));
});