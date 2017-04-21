var express = require('express')
var path = require('path')

var app = express()

app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

var ranStr=["wqewr","bijcxzvc","nhjidsbagv","bigsadyfu"]
app.get('/', function (req, res) {
    var str = ranStr[Math.floor(Math.random()*ranStr.length)]
    res.render('home',{str:str})
})

app.get('/about', function (req, res) {
    res.render('about')
})

app.use(express.static(path.join(__dirname,'/public')))

app.use(function (req, res, next) {
    res.status(404)
    res.render('404')
})

app.use(function (err, req, res, next) {
    console.log(err.stack)
    res.status(500)
    res.render('500')
})

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port'))
})