var createError = require('http-errors');
var express = require('express');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cron = require('node-cron');
const invoiceCtrl = require('./controller/invoiceController');
global.io = require('socket.io');
var ioredis = require('socket.io-redis');
// var pool = require('./database');
var indexRouter = require('./routes/index');
const cors = require('cors');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

var authRoutes = require('express').Router()
authRoutes.use((req,res,next) => {
    // -----------------------------------------------------------------------
    // authentication middleware
    // let basicToken = "Basic " + new Buffer("clientx" + ":" + "Th@R@P@3RO@DC@S7").toString("base64");
    // console.log("Auth",basicToken);
    const auth = {login: 'clientx', password: 'Th@R@P@3RO@DC@S7'} // change this
    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    // Verify login and password are set and correct
    if (login && password && login === auth.login && password === auth.password) {
      // Access granted...
      return next()
    }

    // Access denied...
    res.set('WWW-Authenticate', 'Basic realm="401"') // change this
    res.status(401).send('Authentication required.') // custom message
    // -----------------------------------------------------------------------
})

app.use(cors());
app.use(express.json());

authRoutes.post("/invoices",invoiceCtrl.list);
authRoutes.post("/invoice",invoiceCtrl.add);
app.use('/auth', authRoutes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {

  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	console.log(err.message);
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

const hostname = process.env.HOST;
var server = http.createServer(app);
if(process.env.REDIS_HOST){
  host = process.env.REDIS_HOST;
}
let port = process.env.PORT;
server.listen(port, hostname, () => {

    console.log(`Server running at http://${hostname}:${port}/`);
    console.log("DB Host" + process.env.DB_Host);
    console.log("DB User " + process.env.DB_USER);

});

module.exports = app;
