var express = require('express');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var bodyParser = require('body-parser'); // use POST
var app = express();
var fileStoreOptions = {};

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
	store: new FileStore(fileStoreOptions),
	secret: 'hjyJJm961214@@!',
	resave: false,
	saveUninitialized: true,
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

app.get('/auth/login', function (req, res) {
	var output = `
  <h1>Login</h1>
  <form action="/auth/login" method="post">
    <p>
      <input type="text" name="id" placeholder="username">
    </p>
    <p>
      <input type="password" name="pwd" placeholder="password">
    </p>
    <p>
      <input type="submit">
    </p>
  </form>
  `;
	res.send(output);
});

app.post('/auth/login', function (req, res) {
	var user = {
		uid: 'hjy',
		upwd: '961214',
		displayName:'HanJunyoung'
	};
	var vid = req.body.id;
	var vpwd = req.body.pwd;
	if (vid === user.uid && vpwd === user.upwd) {
		req.session.displayName = user.displayName;
		req.session.save(function () {
			res.redirect('/welcome');
		});	
	} else {
		res.send('Who are you? <a href="/auth/login">login</a>');
	}
});

app.get('/welcome', function (req, res) {
	if (req.session.displayName) {
		res.send(`
			<h1>Hello, ${req.session.displayName}</h1>
			<a href="/auth/logout">Logout</a>
		`);
	} else {
		res.send(`
		<h1>Welcome</h1>
		<a href="/auth/login">Login</a>
		`);
	}
});

app.get('/auth/logout', function (req, res) {
	delete req.session.displayName;
	req.session.save(function () {
		res.redirect('/welcome');
	})
});