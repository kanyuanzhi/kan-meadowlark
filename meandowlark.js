"use strict";
var express = require('express')
var path = require('path')

var app = express()

app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(function (req, res, next) {
    res.locals.showTests = app.get('env') !== 'production'&&req.query.test ==='1'
    next();
})

var ranStr = require('./lib/randomstr')
app.get('/', function (req, res) {
    res.render('home',{
        str:ranStr.getRanStr(),
        pageTestScript:''
    });
})

app.get('/about', function (req, res) {
    res.render('about',{
        pageTestScript:'/qa/tests-about.js'
    });
})

app.get('/headers',function (req, res) {
    res.set('Content-Type','text/plain');
    var s = '';
    for (var name in req.headers){
        s+=name+':'+req.headers(name)+'\n';
    }
    res.send(s);
    console.log(req.headers);
})

app.use(express.static(path.join(__dirname,'/public')))

app.use(function (req, res, next) {
    res.status(404)
    res.render('404');
})

app.use(function (err, req, res, next) {
    console.log(err.stack)
    res.status(500)
    res.render('500');
})

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port'));
});