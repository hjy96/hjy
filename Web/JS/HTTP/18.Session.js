var express = require('express');
var session = require('express-session');
var app = express();

app.use(session({
	secret: 'hjyJJm961214@@!',
	resave: false,
	saveUninitialized: true
}));

app.listen(3003, function () {
	console.log('Connected 3003 port');
});

app.get('/count', function (req, res) {
	if (req.session.count) {
		req.session.count++;
	} else {
		req.session.count = 1;
	}
	res.send('count : '+req.session.count);
});

app.get('/temp', function (req, res) {
	res.send('result : ' + req.session.count);
});