var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

global.MySQL = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'k9nn53o5', 
	database : 'dbtest2020_4_2'
});

app.use('/', require('./routes/index'));
app.use('/cusLogin',require('./routes/cusLogin'));
app.use('/cusLogin/:id/:cname',require('./routes/goSeeMenu')); //this req.params.id is rid
app.use('/cusLogin/:id/:cname/:orderfoodId',require('./routes/goOrderFood'));
app.use('/cusLogin/:id/:cname/:cId/:status/clearCart',require('./routes/goClearCart'));
app.use('/cusLogin/:id/:cname/:cId/:status/confirm',require('./routes/cusConfirmOrder'));
app.use('/cusLogin/:id/:cname/:cId/:status/cusSubmitOrder',require('./routes/cusInsertNewOrder'));
app.use('/cusRegister',require('./routes/cusResgister'));
app.use('/resLogin',require('./routes/resLogin'));
app.use('/resLogin/:rid/resGoSeeCussOrder',require('./routes/resGoSeeCussOrder'));
app.use('/resLogin/:rid/resGoSeeCussOrder/:oid',require('./routes/resSeeCussOrderGoods'));
app.use('/resLogin/:rid/resGoSeeCussOrder/:oid/doAction/:oStatus',require('./routes/resTakeActionToCussOrder'));
app.use('/resLogin/:rid/resGoManageMenu',require('./routes/resGoManageMenu'));
app.use('/resLogin/goCURDMenu/:crud/:rid',require('./routes/goCURDMenu'));
app.use('/resResgister',require('./routes/resResgister'));
app.use('/deliveryManLogin',require('./routes/deliveryManLogin'));
app.use('/deliveryManLogin/:delivId',require('./routes/delivSeeCussOrder'));
app.use('/deliveryManLogin/delivGoSeeCussOrder/:oid/:delivId',require('./routes/delivSeeCussOrderGoods'));
app.use('/deliveryManLogin/delivGoSeeCussOrder/:oid/doAction/:oStatus/:delivId',require('./routes/delivTakeActionToOrder'));
app.use('/deliveryManResgister',require('./routes/deliveryManResgister'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});


// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message : err.message,
			error : err
		});
	});
}

// production error handler
// no stacktraces leaked to user

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message : err.message,
		error : {}
	});
});

module.exports = app;